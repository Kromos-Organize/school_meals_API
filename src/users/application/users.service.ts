import { BadRequestException, Injectable } from "@nestjs/common";
import {
  CreateUserDto,
  UpdateUserDto,
  UserRegistrationDtoType,
} from "../domain/dto/create-user.dto";
import { UsersRepository } from "../infrastructure/users.repository";
import { UsersQueryRepository } from "../infrastructure/users.query.repository";
import { PasswordService } from "../../helpers/password/password.service";
import { RoleEnum } from "../../role/domain/dto/create-role.dto";

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private usersQueryRepository: UsersQueryRepository,
    private passwordService: PasswordService
  ) {}

  async getAll() {
    return await this.usersQueryRepository.getAllUsers();
  }

  async getByEmail(email: string) {
    const manager = await this.usersQueryRepository.getUserByEmail(email);

    if (!manager) {
      throw new BadRequestException({
        message: "Такого менеджера не существует",
        param: "email",
      });
    }

    return manager;
  }

  async createManager(inputModel: UserRegistrationDtoType) {
    const passwordHash = await this.passwordService.generateSaltAndHash(
      inputModel.password
    );
    const newUser = {
      school_id: null,
      role: inputModel.role,
      email: inputModel.email,
      password: passwordHash,
      phone: inputModel.phone,
      fname: null,
      name: null,
      lname: null,
      birthday: null,
      isActive: inputModel.isActive,
    };
    const result = await this.usersRepository.createUser(newUser);
    return result;
  }

  async updateManager(id: string, managerDto: UpdateUserDto) {
    return await this.usersRepository.updateUser(id, managerDto);
  }

  async removeManager(id: string) {
    return await this.usersRepository.deleteUser(id);
  }
}
