import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards} from "@nestjs/common";
import {ClassService} from "../service/class.service";
import {Class} from "../model/class.model";
import {School} from "../model/school.model";
import {CreateClassDto, UpdateClassDto} from "../dto/create-class.dto";
import {AuthGuard} from "@nestjs/passport";

@ApiTags('Классы')
@Controller('class')
@UseGuards(AuthGuard())
export class ClassController {

    constructor(private classService: ClassService) { }

    @ApiOperation({summary: 'Получить список классов'})
    @ApiResponse({status: 200, type: [Class]})
    @Get()
    getAll(@Query('school_id') school_id: number) {

        return this.classService.getAll(school_id);
    }

    @ApiOperation({summary: 'Получить данные класса'})
    @ApiResponse({status: 200, type: Class})
    @Get(':class_id')
    get(@Param('class_id') class_id: number){

        return this.classService.get(class_id);
    }

    @ApiOperation({summary: 'Добавить класс'})
    @ApiResponse({status: 201, type: Class})
    @Post()
    create(@Body() classDto: CreateClassDto) {

        return this.classService.create(classDto);
    }

    @ApiOperation({summary: 'Обновить данные класса'})
    @ApiResponse({status: 200, type: Class})
    @Put(':class_id')
    update(@Param('class_id') id: number, @Body() classDto: UpdateClassDto) {

        return this.classService.update(id, classDto);
    }

    @ApiOperation({summary: 'Удалить класс'})
    @ApiResponse({status: 200, type: School})
    @Delete(':class_id')
    remove(@Param('class_id') id: number) {

        return this.classService.remove(id);
    }

}