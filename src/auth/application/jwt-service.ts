import { Injectable } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import {IPayloadJwt} from "../domain/dto/auth-service.dto";

@Injectable()
export class JwtService {

  async createJWTTokens(user: any, isRefresh: boolean) {

    const payload = this.createPayload(user);

    return {
      accessToken: this.createToken(payload,'ACCESS_JWT_SECRET', process.env.TIME_LIFE_ACCESS),
      refreshToken: isRefresh ? this.createToken(payload, 'REFRESH_JWT_SECRET', process.env.TIME_LIFE_REFRESH) : null,
    };
  }

  createToken(payload, type: 'ACCESS_JWT_SECRET' | 'REFRESH_JWT_SECRET', lifeTime: string) {

    return jwt.sign( payload, process.env[type], { expiresIn: lifeTime });
  }

  createPayload(user: any): IPayloadJwt {

    return { userId: user.id, role: user.role, email: user.email }
  }

  async getUserIdByAccessToken(token: string) {

    try {

      const result: any = jwt.verify(token, process.env.ACCESS_JWT_SECRET);

      return result.userId;

    } catch (error) {

      return null;
    }
  }

  async getUserIdByRefreshToken(token: string) {

    try {

      const result: any = jwt.verify(token, process.env.REFRESH_JWT_SECRET);

      return result;

    } catch (error) {

      return null;
    }
  }
}
