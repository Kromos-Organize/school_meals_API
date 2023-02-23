import {Injectable} from "@nestjs/common";
import {UsersService} from "../../users/application/users.service";
import {UsersQueryRepository} from "../../users/infrastructure/users.query.repository";
import * as bcrypt from "bcrypt";
import {ILogin, IUser} from "../domain/dto/auth-service.dto";
import {RoleEnum} from "../../users/domain/entities/role.enum";
import {IUserModelAttr} from "../../users/domain/dto/user-service.dto";
import {User} from "../../users/domain/entities/user.model";
import {RegisterResponseDto} from "../domain/dto/auth-response.dto";
import {AdminQueryRepository} from "../../admin/infrastructure/admin.query.repository";

@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private usersQueryRepository: UsersQueryRepository,
    private adminQueryRepository: AdminQueryRepository,
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
      role: RoleEnum.manager,
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
}
