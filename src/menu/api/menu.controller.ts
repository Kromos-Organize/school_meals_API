import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {MenuService} from "../application/menu.service";
import {SchoolService} from "../../school/application/school.service";
import {BadCheckEntitiesException} from "../../helpers/exception/BadCheckEntitiesException";
import {Menu} from "../domain/entity/menu.model";
import {MenuCreateDto, MenuParamDto, MenuSchoolQueryDto, UpdateMenuDto} from "../domain/dto/menu-request.dto";
import {MenuDeleteDto} from "../domain/dto/menu-response.dto";
import {TypeMenuService} from "../../typeMenu/application/typeMenu.service";
import {BadRequestResult} from "../../helpers/exception/badRequestResult";

@ApiTags('Меню')
@ApiBearerAuth()
@ApiResponse({status: 401, description: 'Некорректный аксесс-токен'})
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
    @ApiResponse({status: 200, type: [Menu], description: 'Успешное получение списка меню для школы на день'})
    @ApiResponse({status: 400, type: BadRequestResult, description: BadCheckEntitiesException.errorMessage('school','not')})
    @HttpCode(200)
    @Get()
    async getAllMenuBySchool(@Query() queryDto: MenuSchoolQueryDto) {

        const school = await this.schoolService.getSchoolById(queryDto.school_id);

        this.badException.checkAndGenerateException(!school, 'school','not', ['school_id']);

        return this.menuService.getAllMenuBySchoolDate(queryDto.school_id, queryDto.date);
    }

    @ApiOperation({summary: 'Получить меню по id'})
    @ApiResponse({status: 200, type: Menu, description: 'Успешное получение меню по id'})
    @ApiResponse({status: 400, type: BadRequestResult, description: BadCheckEntitiesException.errorMessage('menu','not')})
    @HttpCode(200)
    @Get('/:menu_id')
    async getMenuById(@Param() paramDto: MenuParamDto) {

        const menu = await this.menuService.getMenuById(paramDto.menu_id);

        this.badException.checkAndGenerateException(!menu, 'menu','not', ['menu_id']);

        return menu;
    }

    @ApiOperation({summary: 'Создать меню для школы'})
    @ApiResponse({status: 200, type: Menu, description: 'Успешное создание меню для школы'})
    @ApiResponse({status: 400, type: BadRequestResult, description: BadCheckEntitiesException.errorMessage('menu','yep') + ' / ' + BadCheckEntitiesException.errorMessage('typeMenu','not')})
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
    @ApiResponse({status: 200, type: Menu, description: 'Успешное обновление меню'})
    @ApiResponse({status: 400, type: BadRequestResult, description: BadCheckEntitiesException.errorMessage('menu','not')})
    @HttpCode(200)
    @Put('/:menu_id')
    async updateMenu(@Param() paramDto: MenuParamDto, @Body() updateMenu: UpdateMenuDto){

        const menu = await this.menuService.getMenuById(paramDto.menu_id);

        this.badException.checkAndGenerateException(!menu,'menu','not', ['menu_id']);

        return await this.menuService.updateMenu(paramDto.menu_id, updateMenu);
    }

    @ApiOperation({summary: 'Удалить меню'})
    @ApiResponse({status: 201, type: MenuDeleteDto, description: 'Успешное удаление меню'})
    @ApiResponse({status: 400, type: BadRequestResult, description: BadCheckEntitiesException.errorMessage('menu','not')})
    @HttpCode(201)
    @Delete('/:menu_id')
    async removeMenu(@Param() paramDto: MenuParamDto) {

        const menu = await this.menuService.getMenuById(paramDto.menu_id);

        this.badException.checkAndGenerateException(!menu, 'menu','not', ['menu_id']);

        return this.menuService.removeMenu(paramDto.menu_id);
    }
}