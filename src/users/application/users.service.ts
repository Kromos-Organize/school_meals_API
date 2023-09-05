import {Injectable} from "@nestjs/common";
import {UsersRepository} from "../infrastructure/users.repository";
import {UsersQueryRepository} from "../infrastructure/users.query.repository";
import {PasswordService} from "../../helpers/password/password.service";
import {IActiveUser, IListUsersSchool, IRecoveryData, ISearchQueryUser, IUserModelAttr, IUserUpdateModel} from "../domain/dto/user-service.dto";
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

  async getAll(query: ISearchQueryUser) {

    const sqlParams = this.updateQueryIdParams(query);
  
    return await this.usersQueryRepository.getAllUsers(sqlParams);
  }

  async getByEmail(email: string) {
    return await this.usersQueryRepository.getUserByEmail(email);
  }

  async getById(id: number) {
    return await this.usersQueryRepository.getUserById(id);
  }

  async getListUsersBySchool(param: IListUsersSchool) {
    return await this.usersQueryRepository.getListUsersBySchool(param);
  }

  async getCountEmployeeBySchool(school_id: number) {
    return await this.usersQueryRepository.getCountEmployeeBySchool(school_id);
  }

  async createUser(inputModel: IUserModelAttr) {
    const password = inputModel.password
      ? inputModel.password
      : this.passwordService.generateRandomPass();
    const passwordHash = await this.passwordService.generateSaltAndHash(
      password
    );

    const newUser: IUserModelAttr = {
      ...inputModel,
      password: passwordHash,
      fname: inputModel.fname ?? null,
      name: inputModel.name ?? null,
      lname: inputModel.lname ?? null,
      birthday: null,
    };

    return await this.usersRepository.createUser(newUser);
  }

  async updateUser(id: number, userDto: IUserUpdateModel) {
    return await this.usersRepository.updateUser(id, userDto);
  }

  async changeActiveUser(id: number, activeDto: IActiveUser, email: string) {
    const activatedUser = await this.usersRepository.changeActivateUser(
      id,
      activeDto
    );

    if (activatedUser) {
      const message = `Пользователь ${
        !activatedUser.isActive ? "де" : ""
      }активирован`;

      const resultActivated: UserActivateResponseDto = {
        id: activatedUser.id,
        isActive: activatedUser.isActive,
        message: message,
      };

      await this.emailService.sendModerationMessage(email, message);

      return resultActivated;
    }

    return false;
  }

  async removeUser(id: number) {
    return await this.usersRepository.deleteUser(id);
  }

  async createRecoveryData(recoveryData: IRecoveryData) {
    return this.usersRepository.addRecoveryData(recoveryData);
  }

  async updateRecoveryData(recoveryData: IRecoveryData) {
    return this.usersRepository.updateRecoveryData(recoveryData);
  }

  async confirmAndChangePassword(id: number, passwordData: string) {
    return this.usersRepository.updateUserPasswordAndRecoveryData(
      id,
      passwordData
    );
  }

  // updateQueryNamesParams(params: ISearchQueryUser): string {
  //   const conditions = Object.keys(params).map(name_param => `u.${name_param} ILIKE '%' || '${params[name_param]}' || '%'`);
  //   return 'WHERE ' + conditions.join(' OR ');
  // }

  updateQueryIdParams(params: ISearchQueryUser): string  {
    const conditions = Object.keys(params).map(name_param => `u.${name_param} = ${params[name_param]}`);
    return !!conditions ? "WHERE " + conditions.join(" OR ") : "";
  }
}
