import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import {JwtService} from "@nestjs/jwt";
import { EmployeeService } from "../service/employee.service";

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(
    private employeeService: EmployeeService,
    private jwtService: JwtService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const refToken = req.cookies.refreshToken;
    if (!refToken) {
      throw new UnauthorizedException();
    }
    const token = refToken.split(' ')[0];
    const employee = await this.jwtService.verify(
      token
    );
    if (!employee) {
      throw new UnauthorizedException();
    }
    // const findRefToken = await this.sessionsQueryRepository.getSession(
    //   user.deviceId,
    // );
    // if (
    //   !findRefToken ||
    //   findRefToken.lastActiveDate !== new Date(user.iat * 1000).toISOString()
    // ) {
    //   throw new UnauthorizedException();
    // }
    // @ts-ignore
    req.employee = await this.employeeService.getEmployeeById(employee.id);
    return true;
  }
}
