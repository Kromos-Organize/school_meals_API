import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards} from "@nestjs/common";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {AdminService} from "../application/admin.service";
import {Admin} from "../domain/entities/admin.model";
import {CreateAdminDto, ParamAdminDto, UpdateAdminDto} from "../domain/dto/admin-request.dto";
import {AdminDeleteResponseDto, AdminResponse} from "../domain/dto/admin-response.dto";
import {BadCheckEntitiesException} from "../../helpers/exception/BadCheckEntitiesException";
import {AuthGuard} from "@nestjs/passport";

@ApiTags('Администраторы проекта')
@Controller('admin')
@UseGuards(AuthGuard())
export class AdminController {

    constructor(
        private adminService: AdminService,
        private badException: BadCheckEntitiesException
    ) { }

    @ApiOperation({summary: 'Получение списка админов'})
    @ApiResponse({status: 200,type: [AdminResponse]})
    @HttpCode(200)
    @Get()
    getAll() {

        return this.adminService.getAll();
    }

    @ApiOperation({summary: 'Получить данные админа'})
    @ApiResponse({status: 200,type: AdminResponse})
    @HttpCode(200)
    @Get('/:user_id')
    async getAdminByEmail(@Param() paramDto: ParamAdminDto) {

        const admin = await this.adminService.getAdminById(paramDto.user_id);

        this.badException.checkAndGenerateException(!admin,'admin','not',['user_id']);

        return admin;
    }

    @ApiOperation({summary: 'Добавить админа'})
    @ApiResponse({status: 201,type: Admin})
    @HttpCode(201)
    @Post()
    async create(@Body() adminDto: CreateAdminDto) {

        const admin = await this.adminService.getAdminByEmail(adminDto.email);

        this.badException.checkAndGenerateException(admin, 'admin','yep',['email']);

        return this.adminService.create(adminDto);
    }

    @ApiOperation({summary: 'Изменить данные админа'})
    @ApiResponse({status: 200,type: Admin})
    @HttpCode(200)
    @Put('/:admin_id')
    async update(@Param() paramDto: ParamAdminDto, @Body() adminDto: UpdateAdminDto)  {

        const admin = await this.adminService.getAdminById(paramDto.user_id);

        this.badException.checkAndGenerateException(!admin, 'admin','not',['admin_id']);

        return this.adminService.update(paramDto.user_id, adminDto);
    }

    @ApiOperation({summary: 'Удалить админа'})
    @ApiResponse({status: 200, type: AdminDeleteResponseDto})
    @HttpCode(200)
    @Delete('/:admin_id')
    async remove(@Param() paramDto: ParamAdminDto) {

        const admin = await this.adminService.getAdminById(paramDto.user_id);

        this.badException.checkAndGenerateException(!admin, 'admin','not',['admin_id']);

        return this.adminService.remove(paramDto.user_id);
    }
}
