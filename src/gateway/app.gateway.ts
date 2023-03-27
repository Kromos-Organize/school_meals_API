import {
    OnGatewayConnection, OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse
} from "@nestjs/websockets";
import {Logger} from "@nestjs/common";
import {Socket, Server} from "socket.io";

@WebSocketGateway( {})

export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() wss: Server

    private logger: Logger = new Logger('GATEWAY')

    afterInit(server: Server) {

        this.logger.log(`${Server.name} initialized`)
    }

    handleConnection(client: Socket, ...args: any[]){

        this.logger.log(`Client ${client.id} connected`)
    }

    handleDisconnect(client: Socket) {

        this.logger.log(`Client ${client.id} disconnected)`)
    }

    @SubscribeMessage('msgToServer')
    handleMessage(client: Socket, text: string): WsResponse<string> {

        // this.wss.emit('msgToClient', text)
        // client.emit('msgToClient', text)

        return {event: 'msgToClient', data:  text.split('').reverse().join('')}
    }





}
