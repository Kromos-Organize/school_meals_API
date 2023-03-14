import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {MenuService} from "../application/menu.service";
import {SchoolService} from "../../school/application/school.service";
import {BadCheckEntitiesException} from "../../helpers/exception/BadCheckEntitiesException";
import {Menu} from "../domain/entity/menu.model";
import {CreateTypeMenuDto, MenuCreateDto, UpdateMenuDto, UpdateTypeMenuDto} from "../domain/dto/menu-request.dto";
import {MenuDeleteDto, TypeMenuDeleteDto} from "../domain/dto/menu-response.dto";
import {TypeMenu} from "../domain/entity/type-menu.model";

@ApiTags('Меню')
@Controller('menu')
@UseGuards(AuthGuard())
export class MenuController{

    constructor(
        private menuService: MenuService,
        private schoolService: SchoolService,
        private menuBadException: BadCheckEntitiesException,
    ) { }

    @ApiOperation({summary: 'Получить список меню для школы на день.'})
    @ApiResponse({status: 200, type: [Menu]})
    @HttpCode(200)
    @Get()
    async getAllMenuBySchool(@Query('school_id') school_id: number, @Query('date') date: Date) {

        const school = await this.schoolService.getSchoolById(school_id);

        this.menuBadException.checkThrowSchool(!school, 'not', ['school_id']);

        return this.menuService.getAllMenuBySchoolDate(school_id, date);
    }

    @ApiOperation({summary: 'Получить меню по id'})
    @ApiResponse({status: 200, type: Menu})
    @HttpCode(200)
    @Get(':menu_id')
    async getMenuById(@Param('menu_id') menu_id: number) {

        const menu = await this.menuService.getMenuById(menu_id);

        this.menuBadException.checkThrowMenu(!menu,'not', ['menu_id']);

        return menu;
    }

    @ApiOperation({summary: 'Создать меню для школы'})
    @ApiResponse({status: 200, type: Menu})
    @HttpCode(201)
    @Post()
    async createMenu(@Body() menuDto: MenuCreateDto) {

        const menu = this.menuService.getMenuBySchoolType(menuDto.school_id, menuDto.type_id, menuDto.date);
        const typeMenu = await this.menuService.getTypeMenuById(menuDto.type_id);

        this.menuBadException.checkThrowMenu(menu,'yep',['school_id', 'type_id','date']);
        this.menuBadException.checkThrowMenu(!typeMenu,'not',['type_id']);

        return this.menuService.createMenu(menuDto);
    }

    @ApiOperation({summary: 'Обновить меню'})
    @ApiResponse({status: 200, type: Menu})
    @HttpCode(200)
    @Put(':menu_id')
    async updateMenu(@Param('menu_id') menu_id: number, @Body() updateMenu: UpdateMenuDto){

        const menu = await this.menuService.getMenuById(menu_id);

        this.menuBadException.checkThrowMenu(!menu,'not', ['menu_id']);

        return await this.menuService.updateMenu(menu_id, updateMenu);
    }

    @ApiOperation({summary: 'Удалить меню'})
    @ApiResponse({status: 201, type: MenuDeleteDto})
    @HttpCode(201)
    @Delete(':menu_id')
    async removeMenu(@Param('menu_id') menu_id: number) {

        const menu = await this.menuService.getMenuById(menu_id);

        this.menuBadException.checkThrowMenu(!menu,'not', ['menu_id']);

        return this.menuService.removeMenu(menu_id);
    }

    @ApiOperation({summary: 'Получить список типов меню для школы'})
    @ApiResponse({status: 200, type: [TypeMenu]})
    @HttpCode(200)
    @Get('/type')
    async getAllTypeMenuBySchool(@Query('school_id') school_id: number){

        const school = await this.schoolService.getSchoolById(school_id);

        this.menuBadException.checkThrowSchool(!school, 'not', ['school_id']);

        return await this.menuService.getAllTypeMenuBySchool(school_id);
    }

    @ApiOperation({summary: 'Получить данные типа меню'})
    @ApiResponse({status: 200, type: TypeMenu})
    @HttpCode(200)
    @Get('/type/:type_id')
    async getTypeMenuById(@Param('type_id') type_id: number){

        const typeMenu = await this.menuService.getTypeMenuById(type_id);

        this.menuBadException.checkThrowTypeMenu(!typeMenu, 'not', ['type_id']);

        return typeMenu;
    }

    @ApiOperation({summary: 'Добавить тип меню для школы'})
    @ApiResponse({status: 201, type: TypeMenu})
    @HttpCode(201)
    @Post('/type')
    async createTypeMenu(@Body() typeMenuDto: CreateTypeMenuDto) {

        const typeMenu = await this.menuService.getTypeMenuByName(typeMenuDto.school_id, typeMenuDto.type_menu);

        this.menuBadException.checkThrowTypeMenu(typeMenu, 'yep', ['school_id', 'type_menu']);

        return this.menuService.createTypeMenu(typeMenuDto);
    }

    @ApiOperation({summary: 'Добавить тип меню для школы'})
    @ApiResponse({status: 200, type: TypeMenu})
    @HttpCode(200)
    @Put('/type/:type_id')
    async updateTypeMenu(@Param('type_id') type_id: number ,@Body() updateTypeMenuDto: UpdateTypeMenuDto) {

        const typeMenu = await this.menuService.getTypeMenuById(type_id);

        this.menuBadException.checkThrowTypeMenu(!typeMenu, 'not', ['type_id']);

        return this.menuService.updateTypeMenu(type_id, updateTypeMenuDto);
    }

    @ApiOperation({summary: 'Удалить тип меню'})
    @ApiResponse({status: 200, type: TypeMenuDeleteDto})
    @HttpCode(200)
    @Delete('/type/:type_id')
    async removeTypeMenu(@Param('type_id') type_id: number){

        const typeMenu = await this.menuService.getTypeMenuById(type_id);

        this.menuBadException.checkThrowTypeMenu(!typeMenu, 'not', ['type_id']);

        return this.menuService.removeTypeMenu(type_id);
    }
}