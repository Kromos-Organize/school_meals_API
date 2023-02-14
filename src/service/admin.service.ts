import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Admin} from "../model/admin.model";
import {CreateAdminDto, UpdateAdminDto} from "../dto/create-admin.dto";

@Injectable()
export class AdminService {

    constructor(@InjectModel(Admin) private adminRepository: typeof Admin) { }

    async getAll() {

        return this.adminRepository.findAll();
    }

    async getAdminByEmail(email: string) {

        const admin = await this.adminRepository.findOne({where: {email}})

        if (!admin) {

            throw new BadRequestException({
                message: 'Такого админа не существует',
                field: 'email',
            });
        }

        return admin
    }

    async create(adminDto: CreateAdminDto) {

        return await this.adminRepository.create(adminDto);
    }

    async update(admin_id: string, adminDto: UpdateAdminDto) {

        const admin = await this.adminRepository.findOne({where: {admin_id}})

        if (!admin) {

            throw new BadRequestException({
                message: 'Такого админа не существует',
                param: 'admin_id',
            });
        }

        return await admin.update(adminDto);
    }

    async remove(admin_id: string) {

        const result = await this.adminRepository.destroy({where: {admin_id}})

        return result ? {message: "Админ удален"} : {message: "Админ не найден."}
    }
}
