import { Injectable, Scope } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "../domain/entities/user.model";
import {Sequelize} from "sequelize-typescript";
import {QueryTypes} from "sequelize";
import {RecoveryData} from "../domain/entities/recovery-data.model";
import { IListUsersSchool, ISearchQueryUser } from '../domain/dto/user-service.dto';
import { RoleEnum } from '../domain/entities/role.enum';
import { Class } from 'src/class/domain/entity/class.model';

@Injectable({ scope: Scope.DEFAULT })
export class UsersQueryRepository {
  constructor(
    @InjectModel(User) private usersRepository: typeof User,
    @InjectModel(RecoveryData)
    private recoveryDataRepository: typeof RecoveryData,
    private sequelize: Sequelize
  ) {}

  async getAllUsers(params: string) {

    const res = await this.sequelize.query(
      `
        SELECT u.id, u.school_id, u.role, u.email, u.phone, u.fname, u.name, u.lname, u."isActive", 
        CASE WHEN b.user_id IS NOT NULL THEN TRUE ELSE FALSE END AS is_block
        FROM public.user u 
        LEFT JOIN block_cabinet b ON u.id = b.user_id
        ${params}
        ORDER BY u.id ASC;`,
      {
        type: QueryTypes.SELECT,
        raw: true,
      }
    );

    return res;
  }

  async getUserByEmail(email: string) {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async getUserById(id: number) {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async getListUsersBySchool(param: IListUsersSchool) {
    const isRole =
      param.type_user === RoleEnum.employee ? { role: RoleEnum.employee } : {};

    return await this.usersRepository.findAll({
      where: { school_id: param.school_id, ...isRole },
      attributes: {
        exclude: ["password"],
      },
      include: [{ model: Class, attributes: ["number", "type"] }],
      order: [["id", "ASC"]],
    });
  }

  async getCountEmployeeBySchool(school_id: number) {
    const result = await this.usersRepository.findAll({
      where: { school_id: school_id, role: RoleEnum.employee },
    });

    return { count: result.length };
  }

  async getUserByRecoveryCode(recoveryCode: string) {
    const recoveryData = await this.sequelize.query(
      `
        select * from public.recovery_data
        where recovery_code = :recoveryCode
        `,
      {
        model: RecoveryData,
        mapToModel: true,
        type: QueryTypes.SELECT,
        raw: true,
        replacements: { recoveryCode: recoveryCode },
      }
    );

    const user = await this.usersRepository.findOne({
      where: { id: recoveryData[0].user_id },
      mapToModel: true,
      type: QueryTypes.SELECT,
      raw: true,
    });

    return { user: user, recoveryData: recoveryData[0] };
  }

  async checkSendRecoveryToken(user_id: number) {
    return await this.recoveryDataRepository.findOne({ where: { user_id } });
  }
}
