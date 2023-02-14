import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Admin} from "../model/admin.model";
import {CreateAdminDto} from "../dto/create-admin.dto";

@Injectable()
export class AdminService {

    constructor(@InjectModel(Admin) private adminRepository: typeof Admin) { }

    async getAll() {

        return this.adminRepository.findAll();
    }

    async getAdminByEmail(email: string) {

        const admin = await this.adminRepository.findOne({where: {email}})

        if (!admin) {
            throw new HttpException('Такого админа не существует',HttpStatus.BAD_REQUEST)
        }

        return admin
    }

    async create(adminDto: CreateAdminDto) {

        return await this.adminRepository.create(adminDto);
    }

    async update(admin_id: string, adminDto: CreateAdminDto) {

        const admin = await this.adminRepository.findOne({where: {admin_id}})

        if (!admin) {
            throw new HttpException('Такого админа не существует',HttpStatus.BAD_REQUEST)
        }

        return await admin.update(adminDto);
    }

    async remove(admin_id: string) {

        const result = await this.adminRepository.destroy({where: {admin_id}})

        return result ? {message: "Админ удален"} : {message: "Админ не найден."}
    }
}
