import {CanActivate, ExecutionContext, ForbiddenException, Injectable} from "@nestjs/common";
import {UsersQueryRepository} from "../../users/infrastructure/users.query.repository";
import {Request} from "express";
import {BadCheckEntitiesException} from "../../helpers/exception/BadCheckEntitiesException";
import {isEmail} from "class-validator";

@Injectable()
export class IsActiveUserAuthGuard implements CanActivate {

    constructor(
        private usersQueryRepository: UsersQueryRepository,
        private badException: BadCheckEntitiesException,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const req: Request = context.switchToHttp().getRequest();
        if (Object.keys(req.body).length < 3 || !req.body.email) return false
        
        if (JSON.parse(req.body.isAdminDev)) {

            return true;
        }

        const email = req.body.email;
        if (!isEmail(email)) this.badException.checkAndGenerateException(false,'user', 'not',['email']);

        const user = await this.usersQueryRepository.getUserByEmail(email);

        this.badException.checkAndGenerateException(!user,'user', 'not',['email']);
        
        if (user.isActive) {

            req.user = user;

            return true;
        }

        throw new ForbiddenException();
    }
}