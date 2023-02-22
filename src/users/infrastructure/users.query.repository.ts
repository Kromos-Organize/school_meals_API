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

    return await this.managersRepository.findOne({ where: { email } });
  }
}
