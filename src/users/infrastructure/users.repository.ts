import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {User} from "../domain/entities/user.model";
import {UpdateUserDto, UserRegistrationDtoType,} from "../domain/dto/create-user.dto";

@Injectable()
export class UsersRepository {

  constructor(@InjectModel(User) private usersRepository: typeof User) {}

  async createUser(newUser: UserRegistrationDtoType) {

    return await this.usersRepository.create(newUser);
  }

  async updateUser(id: string, managerDto: UpdateUserDto) {

    const userInstance = await this.usersRepository.findOne({where: { id }});

    if (!userInstance) return false;

    await userInstance.update(managerDto);

    return await userInstance.save();
  }

  async deleteUser(id: string) {

    const result = await this.usersRepository.destroy({ where: { id } });

    return result ? { message: "Менеджер удален" } : { message: "Менеджер не найден." };
  }
}
