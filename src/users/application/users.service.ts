import {Injectable} from "@nestjs/common";
import {UsersRepository} from "../infrastructure/users.repository";
import {UsersQueryRepository} from "../infrastructure/users.query.repository";
import {PasswordService} from "../../helpers/password/password.service";
import {IActiveUser, IUserModelAttr, IUserUpdateModel} from "../domain/dto/user-service.dto";
import {UserActivateResponseDto} from "../domain/dto/user-response.dto";
import {CreateEmployee} from "../domain/dto/user-request.dto";
import {RoleEnum} from "../domain/entities/role.enum";

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

    return await this.usersQueryRepository.getUserByEmail(email);
  }

  async getById(id: number) {

    return await this.usersQueryRepository.getUserById(id)
  }

  async getUserModeration() {

    return await this.usersQueryRepository.getUserModeration()
  }

  async createUser(inputModel: CreateEmployee) {

    const generatedPass = this.passwordService.generateRandomPass();
    const passwordHash = await this.passwordService.generateSaltAndHash(generatedPass);

    const newUser: IUserModelAttr = {
      school_id: inputModel.school_id,
      role: RoleEnum.employee,
      email: inputModel.email,
      password: passwordHash,
      phone: inputModel.phone,
      fname: null,
      name: null,
      lname: null,
      birthday: null,
      isActive: true,
    };

    return await this.usersRepository.createUser(newUser);
  }

  async updateUser(id: number, userDto: IUserUpdateModel) {

    return await this.usersRepository.updateUser(id, userDto);
  }

  async changeActiveUser(id: number, activeDto: IActiveUser) {

    const activatedUser = await this.usersRepository.changeActivateUser(id, activeDto);

    if (activatedUser) {

      const message = `Пользователь ${!activatedUser.isActive ? 'де' : ''}активирован`

      const resultActivated: UserActivateResponseDto = {
        id: activatedUser.id,
        isActive: activatedUser.isActive,
        message: message
      }

      return resultActivated;
    }

    return false;
  }

  async removeUser(id: number) {

    return await this.usersRepository.deleteUser(id);
  }
}
