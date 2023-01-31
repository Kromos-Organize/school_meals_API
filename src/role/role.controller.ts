import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {RoleService} from "./role.service";
import {CreateRoleDto} from "./create-role.dto";

@Controller('role')
export class RoleController {

    constructor(private roleService: RoleService) { }

    @Get('/:type_role')// динамический путь
    getByTypeRole(@Param('type_role') type_role: string) {// Получить значение из пути

        return this.roleService.getRoleByValue(type_role);
    }

    @Post()
    create(@Body() roleDto: CreateRoleDto) {

        return this.roleService.createRole(roleDto);
    }
}
