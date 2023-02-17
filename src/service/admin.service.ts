import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Admin} from "../model/admin.model";
import {CreateAdminDto, UpdateAdminDto} from "../dto/create-admin.dto";
import {RoleService} from "./role.service";
import * as bcrypt from "bcryptjs";

@Injectable()
export class AdminService {

    readonly type_role;

    constructor(@InjectModel(Admin) private adminRepository: typeof Admin,
                private roleService: RoleService) {

        this.type_role = 'ADMIN';
    }


    async getAll() {

        return this.adminRepository.findAll();
    }

    async getAdminByEmail(email: string) {

        const admin = await this.searchByEmail(email);

        if (!admin) {

            throw new BadRequestException({
                message: 'Такого админа не существует',
                field: 'email',
            });
        }

        return admin;
    }

    async create(adminDto: CreateAdminDto) {

        const role = await this.roleService.getRoleByValue(this.type_role);

        const hashPassword = await bcrypt.hash(adminDto.password, 5);

        return await this.adminRepository.create({...adminDto, role_id: role.role_id, password: hashPassword});
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

    async searchByEmail(email: string) {

        return await this.adminRepository.findOne({where: {email}})
    }
}
