import {Body, Controller, Get, Param, Post, UsePipes} from '@nestjs/common';
import {RoleService} from "../service/role.service";
import {CreateRoleDto} from "../dto/create-role.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Role} from "../model/role.model";
import {ValidationBody} from "../pipes/valdationBody.pipe";

@ApiTags('Роли сотрудников')
@Controller('role')
export class RoleController {

    constructor(private roleService: RoleService) { }

    @ApiOperation({summary: 'Получение роли сотрудника по названию роли'})
    @ApiResponse({status: 200, type: Role})
    @Get('/:type_role')
    getByTypeRole(@Param('type_role') type_role: string) {// Получить значение из пути

        return this.roleService.getRoleByValue(type_role);
    }

    @ApiOperation({summary: 'Добавление роли'})
    @ApiResponse({status: 200,type: Role})
    @UsePipes(ValidationBody)
    @Post()
    create(@Body() roleDto: CreateRoleDto) {

        return this.roleService.createRole(roleDto);
    }
}
