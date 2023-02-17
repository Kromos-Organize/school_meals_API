import {Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards} from '@nestjs/common';
import {RoleService} from "../service/role.service";
import {CreateRoleDto, UpdateRoleDto} from "../dto/create-role.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Role} from "../model/role.model";
import {MessageDto} from "../dto/message.dto";
import {AuthGuard} from "@nestjs/passport";

@ApiTags('Роли сотрудников')
@Controller('role')
@UseGuards(AuthGuard())
export class RoleController {

    constructor(private roleService: RoleService) { }

    @ApiOperation({summary: 'Получить список всех ролей'})
    @ApiResponse({status: 200, type: [Role]})
    @Get()
    getAll() {

        return this.roleService.getAll();
    }

    @ApiOperation({summary: 'Получение роли сотрудника по названию роли'})
    @ApiResponse({status: 200, type: Role})
    @Get()
    getByTypeRole(@Query('type_role') type_role: string) {

        return this.roleService.getRoleByValue(type_role);
    }

    @ApiOperation({summary: 'Добавление роли'})
    @ApiResponse({status: 201,type: Role})
    @Post()
    create(@Body() roleDto: CreateRoleDto) {

        return this.roleService.createRole(roleDto);
    }

    @ApiOperation({summary: 'Обновление роли'})
    @ApiResponse({status: 200,type: Role})
    @Put(':role_id')
    update(@Param('role_id') role_id: number, @Body() roleDto: UpdateRoleDto) {

        return this.roleService.updateRole(role_id, roleDto);
    }

    @ApiOperation({summary: 'Удаление роли'})
    @ApiResponse({status: 200, type: MessageDto})
    @Delete(':role_id')
    remove(@Param('role_id') role_id: number) {

        return this.roleService.removeRole(role_id);
    }
}
