import {Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards} from "@nestjs/common";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {AdminService} from "../application/admin.service";
import {Admin} from "../domain/entities/admin.model";
import {CreateAdminDto, UpdateAdminDto} from "../domain/dto/admin-request.dto";
import {AdminDeleteResponseDto, AdminResponse} from "../domain/dto/admin-response.dto";
import {BadCheckEntitiesException} from "../../helpers/exception/BadCheckEntitiesException";
import {AuthGuard} from "@nestjs/passport";

@ApiTags('Администраторы проекта')
@Controller('admin')
@UseGuards(AuthGuard())
export class AdminController {

    constructor(
        private adminService: AdminService,
        private adminException: BadCheckEntitiesException
    ) { }

    @ApiOperation({summary: 'Получение списка админов'})
    @ApiResponse({status: 200,type: [AdminResponse]})
    @Get()
    getAll() {

        return this.adminService.getAll();
    }

    @ApiOperation({summary: 'Получить данные админа'})
    @ApiResponse({status: 200,type: AdminResponse})
    @Get('/email')
    async getAdminByEmail(@Query('email') email: string) {

        const admin = await this.adminService.getAdminByEmail(email);

        this.adminException.checkThrowAdmin(!admin,'not',['email']);

        return admin;
    }

    @ApiOperation({summary: 'Добавить админа'})
    @ApiResponse({status: 201,type: Admin})
    @Post()
    async create(@Body() adminDto: CreateAdminDto) {

        const admin = await this.adminService.getAdminByEmail(adminDto.email);

        this.adminException.checkThrowAdmin(admin,'yep',['email']);

        return this.adminService.create(adminDto);
    }

    @ApiOperation({summary: 'Изменить данные админа'})
    @ApiResponse({status: 200,type: Admin})
    @Put('/:admin_id')
    async update(@Param('admin_id') admin_id: number, @Body() adminDto: UpdateAdminDto)  {

        const admin = await this.adminService.getAdminById(admin_id);

        this.adminException.checkThrowAdmin(!admin,'not',['admin_id']);

        return this.adminService.update(admin_id, adminDto);
    }

    @ApiOperation({summary: 'Удалить админа'})
    @ApiResponse({status: 200, type: AdminDeleteResponseDto})
    @Delete('/:admin_id')
    async remove(@Param('admin_id') admin_id: number) {

        const admin = await this.adminService.getAdminById(admin_id);

        this.adminException.checkThrowAdmin(!admin,'not',['admin_id']);

        return this.adminService.remove(admin_id);
    }
}
