import {CanActivate, ExecutionContext, Injectable, UnauthorizedException,} from '@nestjs/common';
import {Request} from 'express';
import {JwtService} from "@nestjs/jwt";
import {ValidateUserService} from "../service/validateUser.service";
import {IUserJwtPayload} from "../service/jwtToken.service";

@Injectable()
export class RefreshTokenGuard implements CanActivate {

    constructor( private validateUserService: ValidateUserService, private jwtService: JwtService ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const req: Request = context.switchToHttp().getRequest();
        const refToken = req.cookies.refreshToken;

        if (!refToken) {
            throw new UnauthorizedException();
        }

        const token = refToken.split(' ')[0];

        const user: IUserJwtPayload = await this.jwtService.verify(token);

        if (!user) {
            throw new UnauthorizedException();
        }


        req.user = await this.validateUserService.validateByEmail(user.email);
        return true;
    }
}
