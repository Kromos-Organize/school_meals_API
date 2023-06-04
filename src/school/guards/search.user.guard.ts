import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { Request } from "express";
import { UsersQueryRepository } from "../../users/infrastructure/users.query.repository";
import { JwtService } from "../../auth/application/jwt-service";

@Injectable()
export class SearchUserGuard implements CanActivate {

  constructor(
    private usersQueryRepository: UsersQueryRepository,
    private jwtService: JwtService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const req: Request = context.switchToHttp().getRequest();

    const token = req.headers.authorization.split(" ")[1];

    const userId = await this.jwtService.getUserIdByAccessToken(token);

    const user = await this.usersQueryRepository.getUserById(userId);

    if (userId) {

      req.user = user.dataValues;

      return true;
    }

    throw new UnauthorizedException();
  }
}
