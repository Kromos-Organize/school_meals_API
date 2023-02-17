import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {Injectable, UnauthorizedException} from "@nestjs/common";
import {ValidateUserService} from "../service/validateUser.service";

export interface IUserJwtPayload {
    id: number,
    role_id: number,
    email: string
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private validateUserService: ValidateUserService) {
        super({
            secretOrKey: process.env.PRIVATE_KEY || 'SECRET',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload: IUserJwtPayload): Promise<IUserJwtPayload> {

        const { id, role_id, email } = payload;

        const user = await this.validateUserService.validateByEmail(email);

        if (user.id !== id && user.role_id !== role_id) {

            throw new UnauthorizedException();
        }

        return user;
    }
}