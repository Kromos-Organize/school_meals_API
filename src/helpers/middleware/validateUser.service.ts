import {Injectable, UnauthorizedException} from "@nestjs/common";
import {LoginDto,} from "../../auth/domain/dto/auth-request.dto";
import * as bcrypt from "bcrypt";
import {AdminService} from "../../admin/application/admin.service";
import {UsersQueryRepository} from "../../users/infrastructure/users.query.repository";
import {
  ICheckUserReturns,
  IValidateUserEmailReturns,
} from "../../users/domain/dto/user-service.dto";

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

  async validateByEmail(email: string): Promise<IValidateUserEmailReturns> {

    const { password, ...result } = await this.checkUser(email);

    return result;
  }

  async checkUser(email: string): Promise<ICheckUserReturns> {

    const admin = await this.adminService.getAdminByEmail(email);
    const manager = await this.userQueryRepository.getUserByEmail(email);
    
    if (admin)
      return {
        id: admin.id,
        role: admin.role,
        email: admin.email,
        password: admin.password,
        fname: admin.fname,
        name: admin.name,
      };
    if (manager)
      return {
        id: manager.id,
        role: manager.role,
        email: manager.email,
        password: manager.password,
        fname: manager.fname,
        name: manager.name,
      };
  }
}
