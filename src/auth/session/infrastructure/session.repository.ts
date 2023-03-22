import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Session} from "../entities/session.model";
import {SessionCreateDTO} from "../domain/dto/session-service.dto";

@Injectable()
export class SessionRepository {
    constructor(@InjectModel(Session) private sessionRepository: typeof Session) {
    }

    async createSession(dto: SessionCreateDTO): Promise<void> {
        await Session.create({
            ip: dto.ip,
            device_name: dto.device_name,
            user_id: dto.user_id,
        })
    }

    async getUserSessions(data: SessionCreateDTO): Promise<Session> {
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

    async updateLastSessionUsage(data: SessionCreateDTO, date: Date): Promise<void> {
        await this.sessionRepository.update({last_usage_at: date},
            {
                where: {
                    user_id: data.user_id,
                    ip: data.ip,
                    device_name: data.device_name
                }
            })
    }

    async logoutUserSession(data: SessionCreateDTO): Promise<void> {
        await this.sessionRepository.update({logged_out: true},
            {
                where: {
                    user_id: data.user_id,
                    ip: data.ip,
                    device_name: data.device_name
                }
            })
    }
}