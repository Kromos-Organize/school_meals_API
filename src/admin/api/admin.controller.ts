import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards} from "@nestjs/common";
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {AdminService} from "../application/admin.service";
import {Admin} from "../domain/entities/admin.model";
import {CreateAdminDto, ParamAdminDto, UpdateAdminDto} from "../domain/dto/admin-request.dto";
import {AdminDeleteResponseDto, AdminResponse} from "../domain/dto/admin-response.dto";
import {BadCheckEntitiesException} from "../../helpers/exception/BadCheckEntitiesException";
import {AuthGuard} from "@nestjs/passport";
import {BadRequestResult} from "../../helpers/exception/badRequestResult";

@ApiTags('Администраторы проекта')
@Controller('admin')
export class AdminController {

    constructor(
        private adminService: AdminService,
        private badException: BadCheckEntitiesException
    ) { }

    @ApiOperation({summary: 'Получение списка админов'})
    @ApiResponse({status: 200, type: [AdminResponse], description: 'Успешное получение списка админов'})
    @ApiResponse({status: 401, description: 'Некорректный аксесс-токен'})
    @ApiBearerAuth()
    @UseGuards(AuthGuard())
    @HttpCode(200)
    @Get()
    getAll() {

        return this.adminService.getAll();
    }

    @ApiOperation({summary: 'Получить данные админа'})
    @ApiResponse({status: 200, type: AdminResponse, description: 'Успешное получение данных админа'})
    @ApiResponse({status: 400, type: BadRequestResult, description: BadCheckEntitiesException.errorMessage('admin', 'not')})
    @ApiResponse({status: 401, description: 'Некорректный аксесс-токен'})
    @ApiBearerAuth()
    @UseGuards(AuthGuard())
    @HttpCode(200)
    @Get('/:admin_id')
    async getAdminByEmail(@Param() paramDto: ParamAdminDto) {

        const admin = await this.adminService.getAdminById(paramDto.admin_id);

        this.badException.checkAndGenerateException(!admin, 'admin', 'not', ['admin_id']);

        return admin;
    }

    @ApiOperation({summary: 'Добавить админа'})
    @ApiResponse({status: 201, type: Admin, description: 'Успешное добавление админа'})
    @ApiResponse({status: 400, type: BadRequestResult, description: BadCheckEntitiesException.errorMessage('admin', 'yep')})
    @HttpCode(201)
    @Post()
    async create(@Body() adminDto: CreateAdminDto) {

        const admin = await this.adminService.getAdminByEmail(adminDto.email);

        this.badException.checkAndGenerateException(admin, 'admin', 'yep', ['email']);

        return this.adminService.create(adminDto);
    }

    @ApiOperation({summary: 'Изменить данные админа'})
    @ApiResponse({status: 200, type: Admin, description: 'Успешное изменение данных админа'})
    @ApiResponse({status: 400, type: BadRequestResult, description: BadCheckEntitiesException.errorMessage('admin', 'not')})
    @ApiResponse({status: 401, description: 'Некорректный аксесс-токен'})
    @ApiBearerAuth()
    @UseGuards(AuthGuard())
    @HttpCode(200)
    @Put('/:admin_id')

    async update(@Param() paramDto: ParamAdminDto, @Body() adminDto: UpdateAdminDto)  {

        const admin = await this.adminService.getAdminById(paramDto.admin_id);

        this.badException.checkAndGenerateException(!admin, 'admin', 'not', ['admin_id']);

        return this.adminService.update(paramDto.admin_id, adminDto);
    }

    @ApiOperation({summary: 'Удалить админа'})
    @ApiResponse({status: 200, type: AdminDeleteResponseDto, description: 'Успешное удаление админа'})
    @ApiResponse({status: 400, type: BadRequestResult, description: BadCheckEntitiesException.errorMessage('admin', 'not')})
    @ApiResponse({status: 401, description: 'Некорректный аксесс-токен'})
    @ApiBearerAuth()
    @UseGuards(AuthGuard())
    @HttpCode(200)
    @Delete('/:admin_id')
    async remove(@Param() paramDto: ParamAdminDto) {

        const admin = await this.adminService.getAdminById(paramDto.admin_id);

        this.badException.checkAndGenerateException(!admin, 'admin', 'not', ['admin_id']);

        return this.adminService.remove(paramDto.admin_id);
    }
}
