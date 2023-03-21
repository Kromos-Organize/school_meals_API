import {CanActivate, ExecutionContext, Injectable, ForbiddenException, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "../../auth/application/jwt-service";
import {AdminQueryRepository} from "../infrastructure/admin.query.repository";

@Injectable()
export class IsAdminGuard implements CanActivate {

    constructor(
        private jwtService: JwtService,
        private adminQueryRepository: AdminQueryRepository,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean>{

        const req = context.switchToHttp().getRequest();

        try {

            const authHeader = req.headers.authorization;

            const bearer = authHeader.split(' ')[0];
            const token =  authHeader.split(' ')[1];

            if (bearer !== 'Bearer' || !token) {

                new UnauthorizedException({message: 'Не авторизован'})
            }

            const userId = await this.jwtService.getUserIdByAccessToken(token);

            const admin = await this.adminQueryRepository.getById(userId);

            if (!admin) new ForbiddenException()

            return !!admin;

        }catch (e) {

            throw new ForbiddenException({message: 'Доступ не предоставлен.'})
        }

    }
}