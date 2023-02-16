import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Role} from "../model/role.model";
import {CreateRoleDto, UpdateRoleDto} from "../dto/create-role.dto";

@Injectable()
export class RoleService {

    constructor(@InjectModel(Role) private roleRepository: typeof Role) { }

    async getAll() {

        return await this.roleRepository.findAll();
    }

    async getRoleByValue(type_role: string) {

        const role = await this.roleRepository.findOne({where:{type_role}})

        if (!role) {
            throw new BadRequestException({
                message: `Роль <${type_role}> не найдена, создайте роль и повторите попытку.`,
                param: 'type_role',
            });
        }

        return role
    }

    async createRole(dto: CreateRoleDto) {

        const role = await this.roleRepository.findOne({where: {type_role: dto.type_role}})

        if (role) {
            throw new BadRequestException({
                message: `Роль <${role.type_role}> уже существует.`,
                field: 'type_role',
            });
        }

        return await this.roleRepository.create(dto);
    }

    async updateRole(role_id: number, roleDto: UpdateRoleDto) {

        const role = await this.roleRepository.findOne({where: {role_id}});

        if (!role) {
            throw new BadRequestException({
                message: 'Роль не найдена.',
                param: 'role_id',
            });
        }

        return await role.update(roleDto);
    }

    async removeRole(role_id: number) {

        const result = await this.roleRepository.destroy({where: {role_id}})

        return result ? {message: "Роль удалена"} : {message: "Роль не найдена."}
    }
}
