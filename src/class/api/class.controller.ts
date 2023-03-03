import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UseGuards} from "@nestjs/common";
import {ClassService} from "../application/class.service";
import {Class} from "../domain/entities/class.model";
import {AuthGuard} from "@nestjs/passport";
import {CreateClassDto, UpdateClassDto} from "../domain/dto/class-request.dto";
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
        private classException: BadCheckEntitiesException,
    ) { }

    @ApiOperation({summary: 'Получить список классов'})
    @ApiResponse({status: 200, type: [Class]})
    @HttpCode(200)
    @Get()
    async getAll(@Query('school_id') school_id: number) {

        const school = await this.schoolService.get(school_id);

        this.classException.checkThrowSchool(!school, 'not', ['school_id'])

        return this.classService.getAll(school_id);
    }

    @ApiOperation({summary: 'Получить данные класса'})
    @ApiResponse({status: 200, type: Class})
    @HttpCode(200)
    @Get(':class_id')
    async get(@Param('class_id') class_id: number){

        const classSchool =  await this.classService.getClassById(class_id)

        this.classException.checkThrowSchool(!classSchool, 'not', ['class_id'])

        return classSchool;
    }

    @ApiOperation({summary: 'Добавить класс'})
    @ApiResponse({status: 201, type: Class})
    @HttpCode(201)
    @Post()
    async create(@Body() classDto: CreateClassDto) {

        const school = await this.schoolService.get(classDto.school_id);

        this.classException.checkThrowSchool(!school, 'not', ['school_id']);

        const classSchool = await this.classService.getClassByParams(classDto);

        this.classException.checkThrowClass(classSchool, 'yep', ['school_id', 'number', 'type']);

        return this.classService.create(classDto);
    }

    @ApiOperation({summary: 'Обновить данные класса'})
    @ApiResponse({status: 200, type: Class})
    @HttpCode(200)
    @Put(':class_id')
    async update(@Param('class_id') class_id: number, @Body() classDto: UpdateClassDto) {

        const classSchool =  await this.classService.getClassById(class_id)

        this.classException.checkThrowSchool(!classSchool, 'not', ['class_id'])

        return this.classService.update(class_id, classDto);
    }

    @ApiOperation({summary: 'Удалить класс'})
    @ApiResponse({status: 200, type: ClassDeleteResponseDto})
    @HttpCode(200)
    @Delete(':class_id')
    async remove(@Param('class_id') class_id: number) {

        const classSchool =  await this.classService.getClassById(class_id)

        this.classException.checkThrowSchool(!classSchool, 'not', ['class_id'])

        return this.classService.remove(class_id);
    }
}