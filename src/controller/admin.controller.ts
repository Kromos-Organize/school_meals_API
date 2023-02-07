import {Body, Controller, Delete, Get, Param, Put, UsePipes} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {AdminService} from "../service/admin.service";
import {Admin} from "../model/admin.model";
import {CreateAdminDto} from "../dto/create-admin.dto";
import {ValidateParams} from "../validate/validateParams.pipe";

@ApiTags('Администраторы проекта')
@Controller('admin')
export class AdminController {

    constructor(private adminService: AdminService) { }

    @ApiOperation({summary: 'Получение списка админов'})
    @ApiResponse({status: 200,type: [Admin]})
    @Get()
    getAll() {

        return this.adminService.getAll();
    }

    @ApiOperation({summary: 'Получить данные админа'})
    @ApiResponse({status: 200,type: Admin})
    @UsePipes(ValidateParams)
    @Get('/:email')
    getAdminByEmail(@Param('email') email: string) {

        return this.adminService.getAdminByEmail(email);
    }

    @ApiOperation({summary: 'Изменить данные админа'})
    @ApiResponse({status: 200,type: Admin})
    @UsePipes(ValidateParams)
    @Put('/:id')
    update(@Param('id') admin_id: string, @Body() adminDto: CreateAdminDto)  {

        return this.adminService.update(admin_id, adminDto);
    }

    @ApiOperation({summary: 'Удалить админа'})
    @ApiResponse({status: 200})
    @UsePipes(ValidateParams)
    @Delete('/:id')
    remove(@Param('id') admin_id: string) {

        return this.adminService.remove(admin_id);
    }
}
