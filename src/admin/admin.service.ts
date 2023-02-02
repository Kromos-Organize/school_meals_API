import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Admin} from "./admin.model";
import {CreateAdminDto} from "./dto/create-admin.dto";

@Injectable()
export class AdminService {

    constructor(@InjectModel(Admin) private adminRepository: typeof Admin) { }

    async getAll() {

        return this.adminRepository.findAll();
    }

    async getAdminByEmail(email: string) {

        const admin = await this.adminRepository.findOne({where: {email}})

        if (!admin) {
            throw new HttpException('Админ отсутствуетю.',HttpStatus.BAD_REQUEST)
        }

        return admin
    }

    async create(adminDto: CreateAdminDto) {

        return await this.adminRepository.create(adminDto);
    }

    async update(admin_id: string, adminDto: CreateAdminDto) {

        // return this.adminRepository.update({where: {admin_id}},adminDto)
    }

    async remove(admin_id: string) {

        // await this.adminRepository.delete()
    }
}
