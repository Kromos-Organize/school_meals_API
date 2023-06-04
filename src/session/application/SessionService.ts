import {Injectable} from "@nestjs/common";
import {SessionRepository} from "../infrastructure/session.repository";
import {Session} from "../domain/entities/session.model";
import {ISessionCreateDTO} from "../domain/dto/session-service.dto";

@Injectable()
export class SessionService {

    constructor(
        private sessionRepository: SessionRepository,
    ) { }

    async createSession(data: ISessionCreateDTO): Promise<void> {

        await this.sessionRepository.createSession(data)
    }


    async getSessionByDeviceAndIP(data: ISessionCreateDTO): Promise<Session> {

        return await this.sessionRepository.getUserSessions(data)
    }

    async updateLastSessionUsage(data: ISessionCreateDTO): Promise<void> {

        await this.sessionRepository.updateLastSessionUsage(data)

    }

    async logoutUserSession(data: ISessionCreateDTO):Promise<void> {

        await this.sessionRepository.logoutUserSession(data)
    }
}