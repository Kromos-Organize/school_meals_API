import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "../domain/entities/user.model";
import {
  CreateUserDto,
  UpdateUserDto,
  UserRegistrationDtoType,
} from "../domain/dto/create-user.dto";

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User) private usersRepository: typeof User) {}

  async createUser(newUser: UserRegistrationDtoType) {
    console.log("it is a repositoey");
    return await this.usersRepository.create(newUser);
  }

  async updateUser(id: string, managerDto: UpdateUserDto) {
    const userInstance = await this.usersRepository.findOne({
      where: { id },
    });
    // if (!manager) {
    //   throw new BadRequestException({
    //     message: "Такого менеджера не существует",
    //     param: "manager_id",
    //   });
    // }
    if (!userInstance) return false;
    const result = await userInstance.update(managerDto);
    console.log("UpdateUser result", result);
    const saveUpdates = await userInstance.save();
    console.log("SaveUpdateUser result", saveUpdates);
    return saveUpdates;
  }

  async deleteUser(id: string) {
    const result = await this.usersRepository.destroy({ where: { id } });
    console.log("DeleteUser result", result);
    return result
      ? { message: "Менеджер удален" }
      : { message: "Менеджер не найден." };
  }
}
