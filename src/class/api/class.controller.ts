import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UseGuards} from "@nestjs/common";
import {ClassService} from "../application/class.service";
import {Class} from "../domain/entities/class.model";
import {AuthGuard} from "@nestjs/passport";
import {CreateClassDto, UpdateClassDto} from "../domain/dto/class-request.dto";
import {ClassDeleteResponseDto} from "../domain/dto/class-response.dto";
import {SchoolService} from "../../school/application/school.service";
import {BadCheckEntitiesException} from "../../helpers/exception/BadCheckEntitiesException";
import {BadRequestResult} from "../../helpers/exception/badRequestResult";

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
    @ApiBearerAuth()
    @ApiResponse({status: 200, type: [Class], description: 'Успешное получение списка классов'})
    @ApiResponse({status: 400, type: BadRequestResult, description: 'Школа не существует'})
    @ApiResponse({status: 401, description: 'Некорректный аксесс-токен'})
    @HttpCode(200)
    @Get()
    async getAll(@Query('school_id') school_id: number) {

        const school = await this.schoolService.getSchoolById(school_id);

        this.badException.checkAndGenerateException(!school, 'school','not', ['school_id'])

        return this.classService.getAll(school_id);
    }

    @ApiOperation({summary: 'Получить данные класса'})
    @ApiBearerAuth()
    @ApiResponse({status: 200, type: Class, description: 'Успешное получение данных класса'})
    @ApiResponse({status: 400, type: BadRequestResult, description: 'Класс не существует'})
    @ApiResponse({status: 401, description: 'Некорректный аксесс-токен'})
    @HttpCode(200)
    @Get(':class_id')
    async get(@Param('class_id') class_id: number){

        const classSchool =  await this.classService.getClassById(class_id)

        this.badException.checkAndGenerateException(!classSchool, 'class', 'not', ['class_id'])

        return classSchool;
    }

    @ApiOperation({summary: 'Добавить класс'})
    @ApiBearerAuth()
    @ApiResponse({status: 201, type: Class, description: 'Успешное добавление класса'})
    @ApiResponse({status: 400, type: BadRequestResult, description: 'Школа не существует / Класс уже существует'})
    @ApiResponse({status: 401, description: 'Некорректный аксесс-токен'})
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
    @ApiBearerAuth()
    @ApiResponse({status: 200, type: Class, description: 'Успешное обновление данных класса'})
    @ApiResponse({status: 400, type: BadRequestResult, description: 'Класс не существует'})
    @ApiResponse({status: 401, description: 'Некорректный аксесс-токен'})
    @HttpCode(200)
    @Put(':class_id')
    async update(@Param('class_id') class_id: number, @Body() classDto: UpdateClassDto) {

        const classSchool =  await this.classService.getClassById(class_id)

        this.badException.checkAndGenerateException(!classSchool, 'class','not', ['class_id'])

        return this.classService.update(class_id, classDto);
    }

    @ApiOperation({summary: 'Удалить класс'})
    @ApiBearerAuth()
    @ApiResponse({status: 200, type: ClassDeleteResponseDto, description: 'Успешное удаление класса'})
    @ApiResponse({status: 400, type: BadRequestResult, description: 'Класс не существует'})
    @ApiResponse({status: 401, description: 'Некорректный аксесс-токен'})
    @HttpCode(200)
    @Delete(':class_id')
    async remove(@Param('class_id') class_id: number) {

        const classSchool =  await this.classService.getClassById(class_id)

        this.badException.checkAndGenerateException(!classSchool, 'class','not', ['class_id'])

        return this.classService.remove(class_id);
    }
}