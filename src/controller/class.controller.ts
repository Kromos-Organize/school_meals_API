import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Delete, Get, Param, Post, Put, UsePipes} from "@nestjs/common";
import {ClassService} from "../service/class.service";
import {Class} from "../model/class.model";
import {School} from "../model/school.model";
import {ValidationBody} from "../pipes/valdationBody.pipe";
import {CreateClassDto} from "../dto/create-class.dto";
import {ValidateParams} from "../pipes/validateParams.pipe";

@ApiTags('Классы')
@Controller('school/:school_id/class')
export class ClassController {

    constructor(private classService: ClassService) { }

    @ApiOperation({summary: 'Получить список классов'})
    @ApiResponse({status: 200, type: [Class]})
    @Get()
    getAll(@Param('school_id') school_id: number) {

        return this.classService.getAll(school_id);
    }

    @ApiOperation({summary: 'Получить данные класса'})
    @ApiResponse({status: 200, type: Class})
    @UsePipes(ValidateParams)
    @Get(':id')
    get(@Param('id') id: number){

        return this.classService.get(id);
    }

    @ApiOperation({summary: 'Добавить класс'})
    @ApiResponse({status: 200, type: Class})
    @UsePipes(ValidationBody)
    @Post()
    create(@Body() classDto: CreateClassDto) {

        return this.classService.create(classDto);
    }

    @ApiOperation({summary: 'Обновить данные класса'})
    @ApiResponse({status: 200, type: Class})
    // @UsePipes(ValidateParams) в купе с валидацей тела не работает
    @UsePipes(ValidationBody)
    @Put(':id')
    update(@Param('id') id: number, @Body() classDto: CreateClassDto) {

        return this.classService.update(id, classDto);
    }

    @ApiOperation({summary: 'Удалить класс'})
    @ApiResponse({status: 200, type: School})
    @UsePipes(ValidationBody)
    @Delete(':id')
    remove(@Param('id') id: number) {

        return this.classService.remove(id);
    }

}