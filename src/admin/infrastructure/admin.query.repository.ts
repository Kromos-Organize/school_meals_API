import {Injectable, Scope} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Admin} from "../domain/entities/admin.model";

@Injectable({scope: Scope.DEFAULT})
export class AdminQueryRepository {

    @InjectModel(Admin) private adminRepository: typeof Admin;

    async getAllAdmin() {

        return await this.adminRepository.findAll({attributes: {exclude: ['password']}});
    }

    async getByEmail(email: string) {

        return await this.adminRepository.findOne({where: {email}});
    }

    async getById(id: number) {

        return await this.adminRepository.findOne({where: {id}});
    }
}