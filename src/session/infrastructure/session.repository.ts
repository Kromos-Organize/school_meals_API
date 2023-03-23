import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Session} from "../domain/entities/session.model";
import {ISessionCreateDTO} from "../domain/dto/session-service.dto";

@Injectable()
export class SessionRepository {

    constructor(@InjectModel(Session) private sessionRepository: typeof Session) {
    }

    async createSession(dto: ISessionCreateDTO): Promise<void> {

        await Session.create({
            ip: dto.ip,
            device_name: dto.device_name,
            user_id: dto.user_id,
        })
    }

    async getUserSessions(data: ISessionCreateDTO): Promise<Session> {

        return await this.sessionRepository.findOne(
            {
                where:
                    {
                        user_id: data.user_id,
                        ip: data.ip,
                        device_name: data.device_name
                    }
            })
    }

    async updateLastSessionUsage(data: ISessionCreateDTO): Promise<void> {

        await this.sessionRepository.update({last_usage_at: new Date()},
            {
                where: {
                    user_id: data.user_id,
                    ip: data.ip,
                    device_name: data.device_name
                }
            })
    }

    async logoutUserSession(data: ISessionCreateDTO): Promise<void> {

        await this.sessionRepository.update({logged_out: true, last_usage_at: new Date()},
            {
                where: {
                    user_id: data.user_id,
                    ip: data.ip,
                    device_name: data.device_name
                }
            })
    }
}