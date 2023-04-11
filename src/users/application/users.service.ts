import {Injectable} from "@nestjs/common";
import {UsersRepository} from "../infrastructure/users.repository";
import {UsersQueryRepository} from "../infrastructure/users.query.repository";
import {PasswordService} from "../../helpers/password/password.service";
import {IActiveUser, IRecoveryData, IUserModelAttr, IUserUpdateModel} from "../domain/dto/user-service.dto";
import {UserActivateResponseDto} from "../domain/dto/user-response.dto";
import {EmailService} from "../../email-adapter/email-service";

@Injectable()
export class UsersService {

  constructor(
    private usersRepository: UsersRepository,
    private usersQueryRepository: UsersQueryRepository,
    private passwordService: PasswordService,
    private emailService: EmailService
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

  async createUser(inputModel: IUserModelAttr) {

    const password = inputModel.password  ? inputModel.password : this.passwordService.generateRandomPass();
    const passwordHash = await this.passwordService.generateSaltAndHash(password);

    const newUser: IUserModelAttr = {
      ...inputModel,
      password: passwordHash,
      fname: null,
      name: null,
      lname: null,
      birthday: null,
    };

    return await this.usersRepository.createUser(newUser);
  }

  async updateUser(id: number, userDto: IUserUpdateModel) {

    return await this.usersRepository.updateUser(id, userDto);
  }

  async changeActiveUser(id: number, activeDto: IActiveUser, email: string) {

    const activatedUser = await this.usersRepository.changeActivateUser(id, activeDto);

    if (activatedUser) {

      const message = `Пользователь ${!activatedUser.isActive ? 'де' : ''}активирован`

      const resultActivated: UserActivateResponseDto = {
        id: activatedUser.id,
        isActive: activatedUser.isActive,
        message: message
      }

      await this.emailService.sendModerationMessage(email, message)

      return resultActivated;
    }

    return false;
  }

  async removeUser(id: number) {

    return await this.usersRepository.deleteUser(id);
  }

  async createRecoveryData(recoveryData: IRecoveryData) {

    return this.usersRepository.addRecoveryData(recoveryData)
  }

  async confirmAndChangePassword(id: number, passwordData: string) {

    return this.usersRepository.updateUserPasswordAndRecoveryData(id, passwordData)
  }
}
