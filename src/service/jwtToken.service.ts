import {Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";

export interface IUserJwtPayload {
    id: number,
    role_id: number,
    email: string,
}

@Injectable()
export class JwtTokenService {

    constructor(private jwtService: JwtService) { }

    private createPayload(user) {

        return {
            id: user.id,
            role_id: user.role_id,
            email: user.email,
        }
    }

    generateToken(user: IUserJwtPayload) {

        return {
            accessToken: this.jwtService.sign(this.createPayload(user), {expiresIn: '15m'}),
            refreshToken: this.jwtService.sign(this.createPayload(user), {expiresIn: '30d'})
        }
    }


}