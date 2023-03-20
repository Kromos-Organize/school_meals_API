import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {SchoolService} from "../../school/application/school.service";
import {BadCheckEntitiesException} from "../../helpers/exception/BadCheckEntitiesException";
import {TypeMenuService} from "../application/typeMenu.service";
import {TypeMenu} from "../domain/entity/type-menu.model";
import {CreateTypeMenuDto, TypeMenuDto, TypeMenuParamDto, UpdateTypeMenuDto} from "../domain/dto/typeMenu-request.dto";
import {TypeMenuDeleteDto} from "../domain/dto/typeMenu-response.dto";

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
    @ApiResponse({status: 200, type: [TypeMenu]})
    @HttpCode(200)
    @Get()
    async getAllTypeMenuBySchool(@Query() queryDto: TypeMenuDto){

        const school = await this.schoolService.getSchoolById(queryDto.school_id);

        this.badException.checkAndGenerateException(!school, 'school','not', ['school_id']);

        return await this.typeMenuService.getAllTypeMenuBySchool(queryDto.school_id);
    }

    @ApiOperation({summary: 'Получить данные типа меню'})
    @ApiResponse({status: 200, type: TypeMenu})
    @HttpCode(200)
    @Get(':type_id')
    async getTypeMenuById(@Param() paramDto: TypeMenuParamDto){

        const typeMenu = await this.typeMenuService.getTypeMenuById(paramDto.type_id);

        this.badException.checkAndGenerateException(!typeMenu, 'typeMenu','not', ['type_id']);

        return typeMenu;
    }

    @ApiOperation({summary: 'Обновить тип меню для школы'})
    @ApiResponse({status: 201, type: TypeMenu})
    @HttpCode(201)
    @Post()
    async createTypeMenu(@Body() typeMenuDto: CreateTypeMenuDto) {

        const typeMenu = await this.typeMenuService.getTypeMenuByName(typeMenuDto.school_id, typeMenuDto.type_menu);

        this.badException.checkAndGenerateException(typeMenu, 'typeMenu','yep', ['school_id', 'type_menu']);

        return this.typeMenuService.createTypeMenu(typeMenuDto);
    }

    @ApiOperation({summary: 'Добавить тип меню для школы'})
    @ApiResponse({status: 200, type: TypeMenu})
    @HttpCode(200)
    @Put(':type_id')
    async updateTypeMenu(@Param() paramDto: TypeMenuParamDto, @Body() updateTypeMenuDto: UpdateTypeMenuDto) {

        const typeMenu = await this.typeMenuService.getTypeMenuById(paramDto.type_id);

        this.badException.checkAndGenerateException(!typeMenu, 'typeMenu','not', ['type_id']);

        return this.typeMenuService.updateTypeMenu(paramDto.type_id, updateTypeMenuDto);
    }

    @ApiOperation({summary: 'Удалить тип меню'})
    @ApiResponse({status: 200, type: TypeMenuDeleteDto})
    @HttpCode(200)
    @Delete(':type_id')
    async removeTypeMenu(@Param() paramDto: TypeMenuParamDto){

        const typeMenu = await this.typeMenuService.getTypeMenuById(paramDto.type_id);

        this.badException.checkAndGenerateException(!typeMenu, 'typeMenu','not', ['type_id']);

        return this.typeMenuService.removeTypeMenu(paramDto.type_id);
    }
}