import {CanActivate, ExecutionContext, ForbiddenException, UnauthorizedException} from "@nestjs/common";
import {UsersQueryRepository} from "../infrastructure/users.query.repository";
import {BadCheckEntitiesException} from "../../helpers/exception/BadCheckEntitiesException";
import {Request} from "express";
import {JwtService} from "../../auth/application/jwt-service";
import {IPayloadJwt} from "../../auth/domain/dto/auth-service.dto";
import {RoleEnum} from "../domain/entities/role.enum";

export class AccessActivatedUserGuard implements CanActivate {

    constructor(
        private usersQueryRepository: UsersQueryRepository,
        private jwtService: JwtService,
        private badException: BadCheckEntitiesException,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const req: Request = context.switchToHttp().getRequest();

        const requesting: IPayloadJwt = await this.checkToken(req.cookies.refreshToken);

        const changedUser = await this.checkUserForActivate(+req.params.user_id);

        if (requesting.role === RoleEnum.s_admin || requesting.role === RoleEnum.admin) return true;

        if (requesting.role === RoleEnum.employee && changedUser.role === RoleEnum.admin) throw new ForbiddenException('нет доступа');
        if (requesting.role === RoleEnum.admin && changedUser.role === RoleEnum.admin) throw new ForbiddenException('нет доступа');
    }

    async checkToken(refreshToken: string): Promise<IPayloadJwt> {

        if (!refreshToken) throw new UnauthorizedException();

        const token = refreshToken.split(" ")[0];

        const requesting = await this.jwtService.getUserIdByRefreshToken(token);

        if (!requesting) throw new UnauthorizedException();

        return requesting;
    }

    async checkUserForActivate(user_id: number) {

        const user = await this.usersQueryRepository.getUserById(user_id);

        this.badException.checkAndGenerateException(!user, 'user', 'not', ['user_id']);

        return user;
    }
}