import {BadRequestException, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Manager} from "../model/manager.model";
import {CreateManagerDto, UpdateManagerDto} from "../dto/create-manager.dto";
import * as bcrypt from "bcryptjs";
import {RoleService} from "./role.service";

@Injectable()
export class ManagerService {

    readonly type_role;

    constructor(@InjectModel(Manager) private managerRepo: typeof Manager,
                private roleService: RoleService,
                ) {

        this.type_role = 'MANAGER';
    }

    async getAll() {

        return await this.managerRepo.findAll();
    }

    async getByEmail(email: string){

        const manager = await this.searchByEmail(email);

        if (!manager) {

            throw new BadRequestException({
                message: 'Такого менеджера не существует',
                param: 'email',
            });
        }

        return manager;
    }

    async createManager(managerDto: CreateManagerDto) {

        const role = await this.roleService.getRoleByValue(this.type_role);

        const hashPassword = await bcrypt.hash(managerDto.password, 5);

        return await this.managerRepo.create({...managerDto, role_id: role.role_id, password: hashPassword});
    }

    async updateManager(manager_id: string, managerDto: UpdateManagerDto) {

        const manager = await this.managerRepo.findOne({where: {manager_id}})

        if (!manager) {

            throw new BadRequestException({
                message: 'Такого менеджера не существует',
                param: 'manager_id',
            });
        }

        return await manager.update(managerDto);
    }

    async removeManager(manager_id: string) {

        const result = await this.managerRepo.destroy({where: {manager_id}})

        return result ? {message: "Менеджер удален"} : {message: "Менеджер не найден."}
    }

    async searchByEmail(email: string) {

        return await this.managerRepo.findOne({where: {email}});
    }
}