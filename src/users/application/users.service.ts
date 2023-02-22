import {BadRequestException, Injectable} from "@nestjs/common";
import {UpdateUserDto, UserRegistrationDtoType,} from "../domain/dto/create-user.dto";
import {UsersRepository} from "../infrastructure/users.repository";
import {UsersQueryRepository} from "../infrastructure/users.query.repository";
import {PasswordService} from "../../helpers/password/password.service";

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

    const user = await this.usersQueryRepository.getUserByEmail(email);

    if (!user) {
      throw new BadRequestException({
        message: "Такого администратора не существует",
        param: "email",
      });
    }

    return user;
  }

  async createUser(inputModel: UserRegistrationDtoType) {

    const passwordHash = await this.passwordService.generateSaltAndHash(inputModel.password);

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

    return await this.usersRepository.createUser(newUser);
  }

  async updateUser(id: string, managerDto: UpdateUserDto) {

    return await this.usersRepository.updateUser(id, managerDto);
  }

  async removeUser(id: string) {

    return await this.usersRepository.deleteUser(id);
  }
}
