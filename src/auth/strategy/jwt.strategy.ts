import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ValidateUserService } from "../../helpers/middleware/validateUser.service";
import {IPayloadJwt} from "../domain/dto/auth-service.dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(private validateUserService: ValidateUserService) {
    super({
      secretOrKey: process.env.ACCESS_JWT_SECRET || "SECRET",
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: IPayloadJwt): Promise<IPayloadJwt> {

    const { userId, role, email } = payload;

    const user = await this.validateUserService.validateByEmail(email);

    if (user.id !== userId && user.role !== role) throw new UnauthorizedException();

    return user;
  }
}
