import {Injectable} from "@nestjs/common";
import {SessionCreateDTO} from "../domain/dto/session-service.dto";
import {SessionRepository} from "../infrastructure/session.repository";
import {Session} from "../entities/session.model";

@Injectable()
export class SessionService {
    constructor(
        private sessionRepository: SessionRepository,
    ) { }
    async createSession(data: SessionCreateDTO): Promise<void> {
        await this.sessionRepository.createSession(data)
    }


    async getSessionByDeviceAndIP(data: SessionCreateDTO): Promise<Session> {
        return await this.sessionRepository.getUserSessions(data)
    }

    async updateLastSessionUsage(data: SessionCreateDTO, date: Date): Promise<void> {
        await this.sessionRepository.updateLastSessionUsage(data, date)

    }

    async logoutUserSession(data: SessionCreateDTO):Promise<void> {
        await this.sessionRepository.logoutUserSession(data)
    }
}