import { Injectable, Scope } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "../domain/entities/user.model";

@Injectable({ scope: Scope.DEFAULT })
export class UsersQueryRepository {
  @InjectModel(User) private managersRepository: typeof User;

  async getAllUsers() {
    return await this.managersRepository.findAll();
  }

  async getUserByEmail(email: string) {
    const manager = await this.managersRepository.findOne({ where: { email } });

    // if (!manager) {
    //
    //     throw new BadRequestException({
    //         message: 'Такого менеджера не существует',
    //         param: 'email',
    //     });
    // }

    return manager;
  }
}
