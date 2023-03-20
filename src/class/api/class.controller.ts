import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UseGuards} from "@nestjs/common";
import {ClassService} from "../application/class.service";
import {Class} from "../domain/entities/class.model";
import {AuthGuard} from "@nestjs/passport";
import {ClassParamDto, ClassQueryDto, CreateClassDto, UpdateClassDto} from "../domain/dto/class-request.dto";
import {ClassDeleteResponseDto} from "../domain/dto/class-response.dto";
import {SchoolService} from "../../school/application/school.service";
import {BadCheckEntitiesException} from "../../helpers/exception/BadCheckEntitiesException";

@ApiTags('Классы')
@Controller('class')
@UseGuards(AuthGuard())
export class ClassController {

    constructor(
        private schoolService: SchoolService,
        private classService: ClassService,
        private badException: BadCheckEntitiesException,
    ) { }

    @ApiOperation({summary: 'Получить список классов'})
    @ApiResponse({status: 200, type: [Class]})
    @HttpCode(200)
    @Get()
    async getAll(@Query() queryDto: ClassQueryDto) {

        const school = await this.schoolService.getSchoolById(queryDto.school_id);

        this.badException.checkAndGenerateException(!school, 'school','not', ['school_id'])

        return this.classService.getAll(queryDto.school_id);
    }

    @ApiOperation({summary: 'Получить данные класса'})
    @ApiResponse({status: 200, type: Class})
    @HttpCode(200)
    @Get(':class_id')
    async get(@Param() paramDto: ClassParamDto){

        console.log(paramDto)

        const classSchool =  await this.classService.getClassById(paramDto.class_id)

        this.badException.checkAndGenerateException(!classSchool, 'class', 'not', ['class_id'])

        return classSchool;
    }

    @ApiOperation({summary: 'Добавить класс'})
    @ApiResponse({status: 201, type: Class})
    @HttpCode(201)
    @Post()
    async create(@Body() classDto: CreateClassDto) {

        const school = await this.schoolService.getSchoolById(classDto.school_id);

        this.badException.checkAndGenerateException(!school, 'school','not', ['school_id']);

        const classSchool = await this.classService.getClassByParams(classDto);

        this.badException.checkAndGenerateException(classSchool, 'class','yep', ['school_id', 'number', 'type']);

        return this.classService.create(classDto);
    }

    @ApiOperation({summary: 'Обновить данные класса'})
    @ApiResponse({status: 200, type: Class})
    @HttpCode(200)
    @Put(':class_id')
    async update(@Param() paramDto: ClassParamDto, @Body() classDto: UpdateClassDto) {

        const classSchool =  await this.classService.getClassById(paramDto.class_id)

        this.badException.checkAndGenerateException(!classSchool, 'class','not', ['class_id'])

        return this.classService.update(paramDto.class_id, classDto);
    }

    @ApiOperation({summary: 'Удалить класс'})
    @ApiResponse({status: 200, type: ClassDeleteResponseDto})
    @HttpCode(200)
    @Delete(':class_id')
    async remove(@Param() paramDto: ClassParamDto) {

        const classSchool =  await this.classService.getClassById(paramDto.class_id)

        this.badException.checkAndGenerateException(!classSchool, 'class','not', ['class_id'])

        return this.classService.remove(paramDto.class_id);
    }
}