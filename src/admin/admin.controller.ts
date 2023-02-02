import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {AdminService} from "./admin.service";
import {Admin} from "./admin.model";
import {CreateAdminDto} from "./dto/create-admin.dto";

@ApiTags('Администраторы проекта')
@Controller('admin')
export class AdminController {

    constructor(private superAdminService: AdminService) { }

    @ApiOperation({summary: 'Получение списка админов'})
    @ApiResponse({status: 200,type: [Admin]})
    @Get()
    getAll() {

        // return this.superAdminService.getAll();
    }

    @ApiOperation({summary: 'Получить данные админа'})
    @ApiResponse({status: 200,type: Admin})
    @Get('/:admin_id')
    getAdminById(@Param('admin_id') admin_id: string) {

        // return this.superAdminService.getAdminById(admin_id);
    }

    @ApiOperation({summary: 'Создать админа'})
    @ApiResponse({status: 200,type: Admin})
    @Post()
    create(@Body() adminDto: CreateAdminDto) {

        // return this.superAdminService.requestCreate(adminDto);
    }

    @ApiOperation({summary: 'Изменить данные админа'})
    @ApiResponse({status: 200,type: Admin})
    @Put('/:admin_id')
    update(@Param() admin_id: string, @Body() adminDto: CreateAdminDto)  {

        // return this.superAdminService.update(admin_id, adminDto);
    }

    @ApiOperation({summary: 'Удалить админа'})
    @ApiResponse({status: 200})
    @Delete('/:admin_id')
    remove(@Param() admin_id: string) {

        // return this.superAdminService.remove(admin_id);
    }
}
