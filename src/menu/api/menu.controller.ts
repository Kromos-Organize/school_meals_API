import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {MenuService} from "../application/menu.service";
import {SchoolService} from "../../school/application/school.service";
import {BadCheckEntitiesException} from "../../helpers/exception/BadCheckEntitiesException";
import {Menu} from "../domain/entity/menu.model";
import {MenuCreateDto, UpdateMenuDto} from "../domain/dto/menu-request.dto";
import {MenuDeleteDto} from "../domain/dto/menu-response.dto";
import {TypeMenuService} from "../../typeMenu/application/typeMenu.service";
import {BadRequestResult} from "../../helpers/exception/badRequestResult";

@ApiTags('Меню')
@Controller('menu')
@UseGuards(AuthGuard())
export class MenuController{

    constructor(
        private menuService: MenuService,
        private TypeMenuService: TypeMenuService,
        private schoolService: SchoolService,
        private badException: BadCheckEntitiesException,
    ) { }

    @ApiOperation({summary: 'Получить список меню для школы на день.'})
    @ApiBearerAuth()
    @ApiResponse({status: 200, type: [Menu], description: 'Успешное получение списка меню для школы на день'})
    @ApiResponse({status: 400, type: BadRequestResult, description: 'Школа не существует'})
    @ApiResponse({status: 401, description: 'Некорректный аксесс-токен'})
    @HttpCode(200)
    @Get()
    async getAllMenuBySchool(@Query('school_id') school_id: number, @Query('date') date: Date) {

        const school = await this.schoolService.getSchoolById(school_id);

        this.badException.checkAndGenerateException(!school, 'school','not', ['school_id']);

        return this.menuService.getAllMenuBySchoolDate(school_id, date);
    }

    @ApiOperation({summary: 'Получить меню по id'})
    @ApiBearerAuth()
    @ApiResponse({status: 200, type: Menu, description: 'Успешное получение меню по id'})
    @ApiResponse({status: 400, type: BadRequestResult, description: 'Меню не существует'})
    @ApiResponse({status: 401, description: 'Некорректный аксесс-токен'})
    @HttpCode(200)
    @Get('/:menu_id')
    async getMenuById(@Param('menu_id') menu_id: number) {

        const menu = await this.menuService.getMenuById(menu_id);

        this.badException.checkAndGenerateException(!menu, 'menu','not', ['menu_id']);

        return menu;
    }

    @ApiOperation({summary: 'Создать меню для школы'})
    @ApiBearerAuth()
    @ApiResponse({status: 200, type: Menu, description: 'Успешное создание меню для школы'})
    @ApiResponse({status: 400, type: BadRequestResult, description: 'Меню уже существует / Тип меню не существует'})
    @ApiResponse({status: 401, description: 'Некорректный аксесс-токен'})
    @HttpCode(201)
    @Post()
    async createMenu(@Body() menuDto: MenuCreateDto) {

        const menu = await this.menuService.getMenuBySchoolType(menuDto.school_id, menuDto.type_id, menuDto.date);
        const typeMenu = await this.TypeMenuService.getTypeMenuById(menuDto.type_id);

        this.badException.checkAndGenerateException(menu, 'menu','yep',['school_id', 'type_id','date']);
        this.badException.checkAndGenerateException(!typeMenu, 'typeMenu','not',['type_id']);

        return this.menuService.createMenu(menuDto);
    }

    @ApiOperation({summary: 'Обновить меню'})
    @ApiBearerAuth()
    @ApiResponse({status: 200, type: Menu, description: 'Успешное обновление меню'})
    @ApiResponse({status: 400, type: BadRequestResult, description: 'Меню не существует'})
    @ApiResponse({status: 401, description: 'Некорректный аксесс-токен'})
    @HttpCode(200)
    @Put('/:menu_id')
    async updateMenu(@Param('menu_id') menu_id: number, @Body() updateMenu: UpdateMenuDto){

        const menu = await this.menuService.getMenuById(menu_id);

        this.badException.checkAndGenerateException(!menu,'menu','not', ['menu_id']);

        return await this.menuService.updateMenu(menu_id, updateMenu);
    }

    @ApiOperation({summary: 'Удалить меню'})
    @ApiBearerAuth()
    @ApiResponse({status: 201, type: MenuDeleteDto, description: 'Успешное удаление меню'})
    @ApiResponse({status: 400, type: BadRequestResult, description: 'Меню не существует'})
    @ApiResponse({status: 401, description: 'Некорректный аксесс-токен'})
    @HttpCode(201)
    @Delete('/:menu_id')
    async removeMenu(@Param('menu_id') menu_id: number) {

        const menu = await this.menuService.getMenuById(menu_id);

        this.badException.checkAndGenerateException(!menu, 'menu','not', ['menu_id']);

        return this.menuService.removeMenu(menu_id);
    }
}