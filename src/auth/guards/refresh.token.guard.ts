import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Request } from "express";
import { JwtService } from "../application/jwt-service";
import { ValidateUserService } from "../../helpers/middleware/validateUser.service";

@Injectable()
export class RefreshTokenGuard implements CanActivate {

  constructor(
    private validateUserService: ValidateUserService,
    private jwtService: JwtService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const req: Request = context.switchToHttp().getRequest();
    const refToken = req.cookies.refreshToken;

    if (!refToken) throw new UnauthorizedException();

    const token = refToken.split(" ")[0];

    const user = await this.jwtService.getUserIdByRefreshToken(token);

    if (!user) throw new UnauthorizedException();

    req.user = await this.validateUserService.validateByEmail(user.email);

    return true;
  }
}
