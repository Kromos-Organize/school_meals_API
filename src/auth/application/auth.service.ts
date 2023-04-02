import {Injectable, UnauthorizedException} from "@nestjs/common";
import {UsersService} from "../../users/application/users.service";
import {UsersQueryRepository} from "../../users/infrastructure/users.query.repository";
import * as bcrypt from "bcrypt";
import {ILogin, IUser} from "../domain/dto/auth-service.dto";
import {RoleEnum} from "../../users/domain/entities/role.enum";
import {IRecoveryData, IUserModelAttr} from "../../users/domain/dto/user-service.dto";
import {User} from "../../users/domain/entities/user.model";
import {RegisterResponseDto} from "../domain/dto/auth-response.dto";
import {AdminQueryRepository} from "../../admin/infrastructure/admin.query.repository";
import {v4} from "uuid";
import {add, isAfter} from "date-fns";
import {EmailService} from "../../email-adapter/email-service";
import {NewPasswordDto} from "../domain/dto/auth-request.dto";
import {PasswordService} from "../../helpers/password/password.service";

@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private usersQueryRepository: UsersQueryRepository,
    private adminQueryRepository: AdminQueryRepository,
    private emailService: EmailService,
    private passwordService: PasswordService
  ) {}

  async checkCredentials(user: ILogin) {

    const waiting = await this.checkUserOrAdmin(user);

    if (!waiting) return false;

    const isValid = await bcrypt.compare(user.password, waiting.password);

    if (!isValid) return false;

    return waiting.dataValues;
  }

  async registration(userDto: IUser) {

    const inputModel: IUserModelAttr = {
      email: userDto.email,
      password: userDto.password,
      phone: userDto.phone,
      role: RoleEnum.admin,
      isActive: false,
    };

    const user = await this.usersService.createUser(inputModel);

    return this.responseRegister(user);
  }

  responseRegister(user: User): RegisterResponseDto {

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      isActive: user.isActive
    }
  }

  async checkUserOrAdmin(user: ILogin) {

    return user.isAdminDev
      ? await this.adminQueryRepository.getByEmail(user.email)
      : await this.usersQueryRepository.getUserByEmail(user.email);
  }

    async sendRecoveryCode(email: string) {

    const user = await this.usersQueryRepository.getUserByEmail(email)

      if(!user) throw new UnauthorizedException()

      const recoveryData: IRecoveryData = {
        user_id: user.id,
        recovery_code: v4(),
        expired_date: add(new Date(), {minutes: 5}),
        is_confirmed: false
      }

      const addRecoveryData = await this.usersService.createRecoveryData(recoveryData)

      return this.emailService.sendRecoveryCode(user.email, addRecoveryData.recovery_code)
    }

  async confirmPassword(inputPasswordDto: NewPasswordDto) {

    const data = await this.usersQueryRepository.getUserByRecoveryCode(inputPasswordDto.recoveryCode)

    if(!data.user) {

      throw new UnauthorizedException()
    }

    const result = isAfter(new Date(), data.recoveryData.expired_date)

    if(result) {

      throw new UnauthorizedException()
    }

    if (data.recoveryData.is_confirmed === true) {

      throw new UnauthorizedException()
    }

    const passwordData = await this.passwordService.generateSaltAndHash(inputPasswordDto.newPassword)

    await this.usersService.confirmAndChangePassword(data.user.id, passwordData)

    return true

  }

}
