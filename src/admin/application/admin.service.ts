import {Injectable} from '@nestjs/common';
import {AdminQueryRepository} from "../infrastructure/admin.query.repository";
import {AdminRepository} from "../infrastructure/admin.repository";
import {PasswordService} from "../../helpers/password/password.service";
import {RoleEnum} from "../../users/domain/entities/role.enum";
import {IAdminCreationAttrs, IMainAttrAdmin, IUpdateAdminAttrs} from "../domain/dto/admin-service.dto";

@Injectable()
export class AdminService {

    constructor(
        private adminQueryRepository: AdminQueryRepository,
        private adminRepository: AdminRepository,
        private passwordService: PasswordService
    ) { }


    async getAll() {

        return this.adminQueryRepository.getAllAdmin();
    }

    async getAdminById(id: number) {

        return await this.adminQueryRepository.getById(id);
    }

    async getAdminByEmail(email: string) {

        return await this.adminQueryRepository.getByEmail(email);
    }

    async create(adminDto: IMainAttrAdmin) {

        const passwordHash = await this.passwordService.generateSaltAndHash(adminDto.password);

        const newAdmin: IAdminCreationAttrs = {
            ...adminDto,
            password: passwordHash,
            role: RoleEnum.admin,
            chat_number: null
        }

        return await this.adminRepository.createAdmin(newAdmin);
    }

    async update(id: number, adminDto: IUpdateAdminAttrs) {

        return await this.adminRepository.updateAdmin(id, adminDto)
    }

    async remove(id: number) {

        return await this.adminRepository.deleteAdmin(id)
    }
}
