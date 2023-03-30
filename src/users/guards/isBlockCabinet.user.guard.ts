import {
    CanActivate,
    ExecutionContext,
    ForbiddenException, Injectable,
    NotFoundException,
    UnauthorizedException
} from "@nestjs/common";
import {Request} from "express";
import {JwtService} from "../../auth/application/jwt-service";
import {BlockCabinetService} from "../../block_cabinet/application/blockCabinet.service";
import {IPayloadJwt} from "../../auth/domain/dto/auth-service.dto";
import {RoleEnum} from "../domain/entities/role.enum";
import {UsersService} from "../application/users.service";

@Injectable()
export class IsBlockCabinetUserGuard implements CanActivate {

    constructor(
        private blockCabinet: BlockCabinetService,
        private userService: UsersService,
        private jwtService: JwtService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const req: Request = context.switchToHttp().getRequest();

        const requesting: IPayloadJwt = await this.checkToken(req.cookies.refreshToken);

        if (requesting.role === RoleEnum.admin) {

            const isBlock = await this.blockCabinet.getUserById(requesting.id);

            if (isBlock) throw new ForbiddenException('нет доступа');
        }

        if (requesting.role === RoleEnum.employee) {

            const employee = await this.userService.getById(requesting.id);

            if (!employee) throw new NotFoundException('не найден сотрудник');

            const isSchoolInBlock = await this.blockCabinet.getBlockBySchoolId(employee.school_id);

            if (isSchoolInBlock) throw new ForbiddenException('нет доступа');
        }

        return true;
    }

    async checkToken(refreshToken: string): Promise<IPayloadJwt> {

        if (!refreshToken) throw new UnauthorizedException();

        const token = refreshToken.split(" ")[0];

        const requesting = await this.jwtService.getUserIdByRefreshToken(token);

        if (!requesting) throw new UnauthorizedException();

        return requesting;
    }
}
