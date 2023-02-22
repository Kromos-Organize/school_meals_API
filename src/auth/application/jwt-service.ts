import { Injectable } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import * as process from "process";

@Injectable()
export class JwtService {
  async createJWTTokens(user: any) {
    const accessToken = jwt.sign(
      { userId: user.id, role: user.role, email: user.email },
      process.env.ACCESS_JWT_SECRET,
      {
        expiresIn: "15m",
      }
    );
    const refreshToken = jwt.sign(
      { userId: user.id, role: user.role, email: user.email },
      process.env.REFRESH_JWT_SECRET,
      { expiresIn: "30d" }
    );
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
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
