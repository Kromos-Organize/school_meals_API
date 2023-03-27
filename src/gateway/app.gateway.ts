import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse
} from "@nestjs/websockets";
import {Logger} from "@nestjs/common";
import {Server, Socket} from "socket.io";
import {JwtService} from "../auth/application/jwt-service";
import {UsersQueryRepository} from "../users/infrastructure/users.query.repository";
import {AdminQueryRepository} from "../admin/infrastructure/admin.query.repository";
import {MealsQueryRepo} from "../meals/infrastructure/meals.query.repo";
import {MealsRepo} from "../meals/infrastructure/meals.repo";

@WebSocketGateway({})

export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() wss: Server

    constructor(private readonly jwtService: JwtService,
                private readonly usersQueryRepo: UsersQueryRepository,
                private readonly adminsQueryRepo: AdminQueryRepository,
                private readonly mealsQueryRepo: MealsQueryRepo,
                private readonly mealsRepo: MealsRepo) {
    }

    private logger: Logger = new Logger('GATEWAY')
    private clients = {}

    afterInit(server: Server) {

        this.logger.log(`${Server.name} initialized`)
    }

    async handleConnection(client: Socket, ...args: any[]) {

        const cookie = client.request.headers?.cookie

        if (cookie && cookie.indexOf('refreshToken')) {

            let refToken = cookie.slice(cookie.indexOf('refreshToken')).split('=')[1].split(';')[0]

            const payload = await this.jwtService.getUserIdByRefreshToken(refToken)

            if (payload) {

                const user = payload.role !== 'S_ADMIN'
                    ? await this.usersQueryRepo.getUserById(payload?.id)
                    : await this.adminsQueryRepo.getById(payload.id)

                this.clients[client.id] = {
                    name: user.dataValues.name,
                    role: user.dataValues.role
                }
            }
        }

        this.clients[client.id] = this.clients[client.id] ? this.clients[client.id] : null

        const helloMsg = this.clients[client.id] ? `Здравствуйте, ${this.clients[client.id].name}!` : `Привет, Аноним!`

        this.logger.log(helloMsg)

        console.log(this.clients)
    }

    handleDisconnect(client: Socket) {

        this.logger.log(`Client ${client.id} disconnected)`)
        console.log(this.clients)

    }

    @SubscribeMessage('msgToServer')
    handleMessage(client: Socket, text: string): WsResponse<string> {

        // this.wss.emit('msgToClient', text)
        // client.emit('msgToClient', text)

        return {event: 'msgToClient', data: text.split('').reverse().join('')}
    }

    @SubscribeMessage('all_meals_today')
    async handle_all_meals_today(client: Socket) {

        const role = this.clients[client.id]?.role

        const res = (role == 'ADMIN') ? await this.mealsQueryRepo.getAllVisitsByDate(new Date) : null

        if (res) {
            this.wss.emit('msgToClient', JSON.stringify(res))
        } else {
            this.wss.emit('msgToClient', `${this.clients[client.id]}: при подключении админа школы отправлять ему все данные по питанию за текущий день.`)
        }

    }

    @SubscribeMessage('one_meals_today')
    async handle_one_meals_today(client: Socket, data: string) {

        const role = this.clients[client.id]?.role

        const res = (role == 'ADMIN') ? `Отправлены данные по питанию за ${data} класс` : null

        if (this.clients[client.id]) {
            this.wss.emit('msgToClient', JSON.stringify(res))
        } else {
            this.wss.emit('msgToClient', `это сообщение будет отправляться админу школы, когда учитель отправит данные (отправка данных по питанию за один класс)`)
        }
    }

    @SubscribeMessage('calc_meals_today')
    async handle_calc_meals_today(client: Socket) {

        const role = this.clients[client.id]?.role

        const res = role ? await this.mealsQueryRepo.getAllVisitsByDate(new Date) : null

        if (this.clients[client.id]) {
            this.wss.emit('msgToClient', JSON.stringify(res))
        } else {
            this.wss.emit('msgToClient', `будем отправлять результат когда все классы отправят данные`)
        }
    }

    @SubscribeMessage('send_meals')
    async handle_send_meals(client: Socket, data: string) {

        const role = this.clients[client.id]?.role

        //TODO implement class visiting meals room

        const res = (role == 'EMPLOYEE') ? await this.mealsRepo.addStudentVisit(1, []) : null

        if (res) {
            this.wss.emit('msgToClient', JSON.stringify(res))
        } else {
            this.wss.emit('msgToClient', `с этим сообщением будут учителя отправлять данные по классу`)
        }
        this.wss.emit('one_meals_today', data)
    }

    @SubscribeMessage('get_meals_today')
    async handle_get_meals_today(client: Socket) {

        const role = this.clients[client.id]?.role

        const res = (role == 'S_ADMIN') ? await this.mealsQueryRepo.getAllVisitsByDate(new Date) : null

        if (res) {
            this.wss.emit('msgToClient', JSON.stringify(res))
        } else {
            this.wss.emit('msgToClient', `${this.clients[client.id]}: при подключении админа школы отправлять ему все данные по питанию за текущий день.`)
        }
    }

}
