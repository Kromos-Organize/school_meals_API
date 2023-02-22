import { Injectable } from "@nestjs/common";
import * as jwt from "jsonwebtoken";

@Injectable()
export class JwtService {

  async createJWTTokens(user: any) {

    const payload = this.createPayload(user);

    return {
      accessToken: this.createToken(payload, process.env.TIME_LIFE_ACCESS),
      refreshToken: this.createToken(payload, process.env.TIME_LIFE_REFRESH),
    };
  }

  createToken(payload, lifeTime: string) {

    return jwt.sign( payload, process.env.REFRESH_JWT_SECRET, { expiresIn: lifeTime });
  }

  createPayload(user: any) {

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
