import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
} from "@nestjs/websockets";
import { Logger, UnauthorizedException } from "@nestjs/common";
import {Server, Socket} from "socket.io";
import {JwtService} from "../auth/application/jwt-service";
import {UsersQueryRepository} from "../users/infrastructure/users.query.repository";
import { LoggerFile } from 'src/helpers/middleware/logger/logger-file';
import { RoleEnum } from 'src/users/domain/entities/role.enum';
import { User } from 'src/users/domain/entities/user.model';
import { ClientsType } from './types';
import { MealsQueryRepository } from 'src/meals/infrastructure/meals-query-repository';
import { IMealsCreateAttr } from 'src/meals/domain/dto/meals-service.dto';

@WebSocketGateway({ transports: ['websocket'] })
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() wss: Server

    constructor(private readonly jwtService: JwtService,
                private readonly usersQueryRepo: UsersQueryRepository,
                private readonly mealsQueryRepo: MealsQueryRepository,
    ) { }

    private logger: Logger = new Logger('GATEWAY')
    private logger_file: LoggerFile = new LoggerFile(LoggerFile.nameFiles.socket);

    private clients: ClientsType = {}

    afterInit(server: Server) {

        this.logger.log(`${Server.name} initialized`)
    }

    async handleConnection(socket: Socket, ...args: any[]) {

        // const accessToken = client.handshake.auth.accessToken;// для фронта
        const accessToken = socket.request.headers?.authorization; // для постмана

        const client = this.validateAccessToken(accessToken, socket);

        if(client) {

            const data_today = await this.getVisitedToday()

            this.wss.emit("client/all_meals_today", data_today);

            this.logger_file.writeFile(`Connection socket with id = ${socket.id}`)
        } else {

            this.wss.emit('client/error', new UnauthorizedException('Invalid access token.'))
            this.disconnectSocket(socket);
        }
    }

    handleDisconnect(socket: Socket) {

        this.disconnectSocket(socket);
    }

    private disconnectSocket(socket: Socket) {

        this.logger_file.writeFile(`Disconnected socket with id = ${socket.id}`)
        socket.disconnect();
    }

    private saveDataClient(user: User, socket: Socket) {

        this.clients[socket.id] = {
          user_id: user.id,
          school_id: user.school_id,
          role: user.dataValues.role,
        };

        if (user.role === RoleEnum.employee) {

            const entries = Object.entries(this.clients);

            entries.forEach(cl => {
                const [client_id, user] = cl

                if(user.role === RoleEnum.admin) {
                    
                    this.clients[socket.id] = {...this.clients[socket.id], admin_client_id: client_id}
                }
            })
        }

        return this.clients[socket.id];
    }

    private async validateAccessToken(accessToken: string, socket: Socket) {

        if(accessToken) {
          
            const user_id = await this.jwtService.getUserIdByAccessToken(accessToken)
  
            if(user_id) {
  
                const user = await this.usersQueryRepo.getUserById(user_id);
  
                return this.saveDataClient(user, socket);
            }
        }
    }

    private getStringClientLog(client_id: string): string {
        
		const client = this.clients[client_id];

		return `Client_id = ${client_id} -- role: ${client.role}`;
	}

	public async getVisitedToday() {

		return await this.mealsQueryRepo.getAllVisitsByDate(new Date());
	}

    @SubscribeMessage('server/msgToServer')
    handleMessage(socket: Socket, text: string): WsResponse<string> {

        const res_data = text.split("").reverse().join("");

        this.logger_file.writeFile(`${this.getStringClientLog(socket.id)}\nevent msgToClient\nreq_data: ${text}\nres_data: ${res_data}`)

        return { event: "client/msgToClient", data: res_data };
    }

    @SubscribeMessage('server/all_meals_today') // получить все данные за сегодня
    async handle_all_meals_today(socket: Socket): Promise<WsResponse<string>> {

        const res = await this.getVisitedToday();

        this.logger_file.writeFile(`${this.getStringClientLog(socket.id)}event all_meals_today\nreq_data: ''\nres_data: ${JSON.stringify(res)}`)

        if (res) {

            return { event: "client/all_meals_today", data: JSON.stringify(res)};
        }
    }

    @SubscribeMessage('server/send_meals')// отправка данных по классам для сохранения
    async handle_send_meals(socket: Socket, data: IMealsCreateAttr[]) {

        const client = this.clients[socket.id];

		const admin_socket = this.wss.sockets[client.admin_client_id];

		const admin = this.clients[client.admin_client_id]; 

		if (admin_socket && admin && admin.school_id === client.school_id) {

			admin_socket.emit("client/one_meals_today", JSON.stringify(data));
		}
    }
}


// @SubscribeMessage('server/one_meals_today') // событие отправляется при отправке учителем данных
// async handle_one_meals_today(client: Socket, data: string) {

//     const role = this.clients[client.id]?.role

//     const res = (role == 'ADMIN') ? `Отправлены данные по питанию за ${data} класс` : null

//     if (res) {
//         this.wss.emit('client/one_meals_today', JSON.stringify(res))
//     }
// }

// @SubscribeMessage('server/calc_meals_today')
// async handle_calc_meals_today(socket: Socket) {

//     const role = this.clients[socket.id]?.role;

//     // const res = role ? await this.mealsQueryRepo.getAllVisitsByDate(new Date) : null

//     if (res) {
//         this.wss.emit('client/calc_meals_today', JSON.stringify(res));
//     }
// }

// @SubscribeMessage('server/get_meals_today')
// async handle_get_meals_today(socket: Socket) {

//     const role = this.clients[socket.id]?.role;

//     // const res = (role == 'ADMIN') ? await this.mealsQueryRepo.getAllVisitsByDate(new Date) : null

//     if (res) {
//         this.wss.emit('get_meals_today', JSON.stringify(res));
//     }
// }
