import { Injectable, Scope } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "../domain/entities/user.model";

@Injectable({ scope: Scope.DEFAULT })
export class UsersQueryRepository {

  @InjectModel(User) private usersRepository: typeof User;

  async getAllUsers() {

    return await this.usersRepository.findAll({attributes: {exclude: ['password']}});
  }

  async getUserByEmail(email: string) {

    return await this.usersRepository.findOne({ where: { email } });
  }

  async getUserById(id: number) {

    return await this.usersRepository.findOne({ where: { id } });
  }
}
