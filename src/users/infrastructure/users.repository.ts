import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {User} from "../domain/entities/user.model";
import {IActiveUser, IRecoveryData, IUserModelAttr, IUserUpdateModel} from "../domain/dto/user-service.dto";
import {RecoveryData} from "../domain/entities/recovery-data.model";
import {Sequelize} from "sequelize-typescript";

@Injectable()
export class UsersRepository {

    constructor(@InjectModel(User) private usersRepository: typeof User,
                @InjectModel(RecoveryData) private recoveryDataRepository: typeof RecoveryData,
                private sequelize: Sequelize) {
    }

    async createUser(newUser: IUserModelAttr) {

        return await this.usersRepository.create(newUser);
    }

    async updateUser(id: number, userDto: IUserUpdateModel) {

        const userInstance = await this.usersRepository.findOne({where: {id}});

        if (!userInstance) return false;

        if (userInstance.school_id) delete userDto.school_id;

        await userInstance.update(userDto);

        return await userInstance.save();
    }

    async changeActivateUser(id: number, activeDto: IActiveUser) {

        const userInstance = await this.usersRepository.findOne({where: {id}});

        if (!userInstance) return false;

        await userInstance.update(activeDto);

        return await userInstance.save();
    }

    async deleteUser(id: number) {

        const result = await this.usersRepository.destroy({where: {id}});

        return result && {id}
    }

    async addRecoveryData(recoveryData: IRecoveryData) {

        return this.recoveryDataRepository.create(recoveryData)

    }

    async updateUserPasswordAndRecoveryData(id: number, passwordData: string) {
        const transaction = await this.sequelize.transaction();

        try {

            await this.sequelize.query(`
            update public.user
            set password = :password
            where id = :id
            `, {
                replacements: {
                    password: passwordData,
                    id: id
                },
                transaction
            })

            await this.sequelize.query(`
            update public.recovery_data
            set is_confirmed = true
            where user_id = :id
            `, {
                replacements: {
                    id: id
                }, transaction
            })

            await transaction.commit();

        } catch (e) {

            await transaction.rollback();
        }
    }
}
