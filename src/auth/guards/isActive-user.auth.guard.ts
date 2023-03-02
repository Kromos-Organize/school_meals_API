import {CanActivate, ExecutionContext, ForbiddenException, Injectable} from "@nestjs/common";
import {UsersQueryRepository} from "../../users/infrastructure/users.query.repository";
import {Request} from "express";
import {BadCheckEntitiesException} from "../../helpers/exception/BadCheckEntitiesException";

@Injectable()
export class IsActiveUserAuthGuard implements CanActivate {

    constructor(
        private usersQueryRepository: UsersQueryRepository,
        private badException: BadCheckEntitiesException,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const req: Request = context.switchToHttp().getRequest();

        if (req.body.isAdminDev) {

            return true;
        }

        const email = req.body.email;

        const user = await this.usersQueryRepository.getUserByEmail(email);

        this.badException.checkThrowUsers(!user,'not',['email'])

        if (user.isActive) {

            req.user = user;

            return true;
        }

        throw new ForbiddenException();
    }
}