import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Role} from "./role.model";
import {CreateRoleDto} from "./dto/create-role.dto";

@Injectable()
export class RoleService {

    constructor(@InjectModel(Role) private roleRepository: typeof Role) { }

    async getRoleByValue(type_role: string) {

        return await this.roleRepository.findOne({where:{type_role}})
    }

    async createRole(dto: CreateRoleDto) {

        return await this.roleRepository.create(dto);
    }
}
