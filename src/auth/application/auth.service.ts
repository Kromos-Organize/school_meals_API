import { Injectable } from "@nestjs/common";
import {
  CreateUserDto,
  UserRegistrationDtoType,
} from "../../users/domain/dto/create-user.dto";
import { UsersService } from "../../users/application/users.service";
import { ValidateUserService } from "../../helpers/middleware/validateUser.service";
import { RoleEnum } from "../../role/domain/dto/create-role.dto";
import { UsersQueryRepository } from "../../users/infrastructure/users.query.repository";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private usersQueryRepository: UsersQueryRepository
  ) {}

  // async login(user: UserModule) {
  //   return this.jwtTokenService.generateToken(user);
  // }

  async checkCredentials(inputModel: any) {
    const user = await this.usersQueryRepository.getUserByEmail(
      inputModel.loginOrEmail
    );
    if (!user) return false;
    const isValid = await bcrypt.compare(inputModel.password, user.password);
    if (!isValid) {
      return false;
    }
    return user.dataValues;
  }

  async registration(managerDto: CreateUserDto) {
    const inputModel: UserRegistrationDtoType = {
      email: managerDto.email,
      password: managerDto.password,
      phone: managerDto.phone,
      role: RoleEnum.manager,
      isActive: false,
    };
    return await this.usersService.createManager(inputModel);
  }
}
