import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {SchoolService} from "../../school/application/school.service";
import {BadCheckEntitiesException} from "../../helpers/exception/BadCheckEntitiesException";
import {TypeMenuService} from "../application/typeMenu.service";
import {TypeMenu} from "../domain/entity/type-menu.model";
import {CreateTypeMenuDto, UpdateTypeMenuDto} from "../domain/dto/typeMenu-request.dto";
import {TypeMenuDeleteDto} from "../domain/dto/typeMenu-response.dto";
import {BadRequestResult} from "../../helpers/exception/badRequestResult";

@ApiTags('Тип Меню')
@Controller('type-menu')
@UseGuards(AuthGuard())
export class TypeMenuController{

    constructor(
        private typeMenuService: TypeMenuService,
        private schoolService: SchoolService,
        private badException: BadCheckEntitiesException,
    ) { }

    @ApiOperation({summary: 'Получить список типов меню для школы'})
    @ApiBearerAuth()
    @ApiResponse({status: 200, type: [TypeMenu], description: 'Успешное получение списка типов меню для школы'})
    @ApiResponse({status: 400, type: BadRequestResult, description: 'Школа не существует'})
    @ApiResponse({status: 401, description: 'Некорректный аксесс-токен'})
    @HttpCode(200)
    @Get()
    async getAllTypeMenuBySchool(@Query('school_id') school_id: number){

        const school = await this.schoolService.getSchoolById(school_id);

        this.badException.checkAndGenerateException(!school, 'school','not', ['school_id']);

        return await this.typeMenuService.getAllTypeMenuBySchool(school_id);
    }

    @ApiOperation({summary: 'Получить данные типа меню'})
    @ApiBearerAuth()
    @ApiResponse({status: 200, type: TypeMenu, description: 'Успешное получение данных типа меню'})
    @ApiResponse({status: 400, type: BadRequestResult, description: 'Тип меню не существует'})
    @ApiResponse({status: 401, description: 'Некорректный аксесс-токен'})
    @HttpCode(200)
    @Get(':type_id')
    async getTypeMenuById(@Param('type_id') type_id: number){

        const typeMenu = await this.typeMenuService.getTypeMenuById(type_id);

        this.badException.checkAndGenerateException(!typeMenu, 'typeMenu','not', ['type_id']);

        return typeMenu;
    }

    @ApiOperation({summary: 'Добавить тип меню для школы'})
    @ApiBearerAuth()
    @ApiResponse({status: 201, type: TypeMenu, description: 'Успешное добавление типа меню для школы'})
    @ApiResponse({status: 400, type: BadRequestResult, description: 'Тип меню уже существует'})
    @ApiResponse({status: 401, description: 'Некорректный аксесс-токен'})
    @HttpCode(201)
    @Post()
    async createTypeMenu(@Body() typeMenuDto: CreateTypeMenuDto) {

        const typeMenu = await this.typeMenuService.getTypeMenuByName(typeMenuDto.school_id, typeMenuDto.type_menu);

        this.badException.checkAndGenerateException(typeMenu, 'typeMenu','yep', ['school_id', 'type_menu']);

        return this.typeMenuService.createTypeMenu(typeMenuDto);
    }

    @ApiOperation({summary: 'Обновить тип меню для школы'})
    @ApiBearerAuth()
    @ApiResponse({status: 200, type: TypeMenu, description: 'Успешное обновление типа меню для школы'})
    @ApiResponse({status: 400, type: BadRequestResult, description: 'Тип меню не существует'})
    @ApiResponse({status: 401, description: 'Некорректный аксесс-токен'})
    @HttpCode(200)
    @Put(':type_id')
    async updateTypeMenu(@Param('type_id') type_id: number ,@Body() updateTypeMenuDto: UpdateTypeMenuDto) {

        const typeMenu = await this.typeMenuService.getTypeMenuById(type_id);

        this.badException.checkAndGenerateException(!typeMenu, 'typeMenu','not', ['type_id']);

        return this.typeMenuService.updateTypeMenu(type_id, updateTypeMenuDto);
    }

    @ApiOperation({summary: 'Удалить тип меню'})
    @ApiBearerAuth()
    @ApiResponse({status: 200, type: TypeMenuDeleteDto, description: 'Успешное удаление типа меню'})
    @ApiResponse({status: 400, type: BadRequestResult, description: 'Тип меню не существует'})
    @ApiResponse({status: 401, description: 'Некорректный аксесс-токен'})
    @HttpCode(200)
    @Delete(':type_id')
    async removeTypeMenu(@Param('type_id') type_id: number){

        const typeMenu = await this.typeMenuService.getTypeMenuById(type_id);

        this.badException.checkAndGenerateException(!typeMenu, 'typeMenu','not', ['type_id']);

        return this.typeMenuService.removeTypeMenu(type_id);
    }
}