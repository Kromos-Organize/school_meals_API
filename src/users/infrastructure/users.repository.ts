import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {User} from "../domain/entities/user.model";
import {IActiveUser, IUserModelAttr, IUserUpdateModel} from "../domain/dto/user-service.dto";

@Injectable()
export class UsersRepository {

  constructor(@InjectModel(User) private usersRepository: typeof User) {}

  async createUser(newUser: IUserModelAttr) {

    return await this.usersRepository.create(newUser);
  }

  async updateUser(id: number, userDto: IUserUpdateModel) {

    const userInstance = await this.usersRepository.findOne({where: { id }});

    if (!userInstance) return false;

    if (userInstance.school_id) delete userDto.school_id;

    await userInstance.update(userDto);

    return await userInstance.save();
  }

  async changeActivateUser(id: number, activeDto: IActiveUser) {

    const userInstance = await this.usersRepository.findOne({where: { id }});

    if (!userInstance) return false;

    await userInstance.update(activeDto);

    return await userInstance.save();
  }

  async deleteUser(id: number) {

    const result = await this.usersRepository.destroy({ where: { id } });

    return result && { id }
  }
}
