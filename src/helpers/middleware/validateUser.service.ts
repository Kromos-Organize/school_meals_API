import { Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginDto, UserDto } from "../../auth/domain/dto/auth.dto";
import * as bcrypt from "bcrypt";
import { AdminService } from "../../admin/application/admin.service";
import { UsersService } from "../../users/application/users.service";
import { UsersQueryRepository } from "../../users/infrastructure/users.query.repository";

@Injectable()
export class ValidateUserService {
  constructor(
    private adminService: AdminService,
    private userQueryRepository: UsersQueryRepository
  ) {}

  async validateUser(userDto: LoginDto) {
    const user = await this.checkUser(userDto.email);

    if (user) {
      const passwordEq = await bcrypt.compare(userDto.password, user.password);

      if (userDto && passwordEq) {
        const { password, ...result } = user;

        return result;
      }
    }

    throw new UnauthorizedException({
      message: "Некорректный емейл или пароль.",
    });
  }

  async validateByEmail(email: string) {
    const { password, ...result } = await this.checkUser(email);

    return result;
  }

  async checkUser(email: string): Promise<UserDto> {
    const admin = await this.adminService.getAdminByEmail(email);
    const manager = await this.userQueryRepository.getUserByEmail(email);

    if (admin)
      return {
        id: admin.id,
        role_id: admin.role_id,
        email: admin.email,
        password: admin.password,
      };
    if (manager)
      return {
        id: manager.id,
        role: manager.role,
        email: manager.email,
        password: manager.password,
      };
  }
}
