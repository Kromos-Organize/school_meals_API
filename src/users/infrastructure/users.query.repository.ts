import { Injectable, Scope } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "../domain/entities/user.model";
import {Sequelize} from "sequelize-typescript";
import {QueryTypes} from "sequelize";
import {RecoveryData} from "../domain/entities/recovery-data.model";

@Injectable({ scope: Scope.DEFAULT })
export class UsersQueryRepository {

  constructor(
    @InjectModel(User) private usersRepository: typeof User,
    private sequelize: Sequelize,
  ) {}

  async getAllUsers() {

    return await this.usersRepository.findAll({attributes: {exclude: ['password']}});
  }

  async getUserByEmail(email: string) {

    return await this.usersRepository.findOne({ where: { email } });
  }

  async getUserById(id: number) {

    return await this.usersRepository.findOne({ where: { id } });
  }

  async getListUsers() {

    const res = await this.sequelize.query(`
        SELECT u.id, u.school_id, u.role, u.email, u.phone, u.fname, u.name, u.lname, u."isActive", 
        CASE WHEN b.user_id IS NOT NULL THEN TRUE ELSE FALSE END AS isBlock
        FROM public.user u 
        LEFT JOIN block_cabinet b ON u.id = b.user_id;`,{
        type: QueryTypes.SELECT,
        raw: true,

    })

    return res;
  }

  async getUserByRecoveryCode(recoveryCode: string) {

    const recoveryData = await this.sequelize.query(`
        select * from public.recovery_data
        where recovery_code = :recoveryCode
        `, {
          model: RecoveryData,
          mapToModel: true,
          type: QueryTypes.SELECT,
          raw: true,
          replacements: {recoveryCode: recoveryCode}
        })

    const user = await this.usersRepository.findOne(
          {where: {id : recoveryData[0].user_id},
            mapToModel: true,
            type: QueryTypes.SELECT,
            raw: true
          })

    return {user: user, recoveryData: recoveryData[0]}
  }
}
