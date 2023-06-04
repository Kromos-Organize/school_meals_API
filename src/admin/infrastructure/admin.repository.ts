import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Admin} from "../domain/entities/admin.model";
import {IAdminCreationAttrs, IUpdateAdminAttrs} from "../domain/dto/admin-service.dto";

@Injectable()
export class AdminRepository {

    @InjectModel(Admin) private adminRepository: typeof Admin;

    async createAdmin(newAdmin: IAdminCreationAttrs) {

        return await this.adminRepository.create(newAdmin);
    }

    async updateAdmin(id: number, adminDto: IUpdateAdminAttrs) {

        const adminInstance = await this.adminRepository.findOne({where: { id }});

        if (!adminInstance) return false;

        await adminInstance.update(adminDto);

        return await adminInstance.save();
    }

    async deleteAdmin(id: number) {

        const result = await this.adminRepository.destroy({ where: { id } });

        return result && { id }
    }

}