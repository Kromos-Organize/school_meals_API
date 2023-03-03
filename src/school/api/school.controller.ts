import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {SchoolService} from "../application/school.service";
import {SchoolCreateDto} from "../domain/dto/school-request.dto";
import {School} from "../domain/entities/school.model";
import {AuthGuard} from "@nestjs/passport";
import {BadCheckEntitiesException} from "../../helpers/exception/BadCheckEntitiesException";
import {SchoolDeleteResponseDto} from "../domain/dto/school-reponse.dto";

@ApiTags('Школа')
@Controller('school')
@UseGuards(AuthGuard())
export class SchoolController {

    constructor(
        private schoolService: SchoolService,
        private schoolException: BadCheckEntitiesException
    ) { }

    @ApiOperation({summary: 'Получить список школ'})
    @ApiResponse({status: 200, type: [School]})
    @HttpCode(200)
    @Get()
    getAll() {

        return this.schoolService.getAllSchool();
    }

    @ApiOperation({summary: 'Получить данные школы'})
    @ApiResponse({status: 200, type: School})
    @HttpCode(200)
    @Get(':school_id')
    async get(@Param('school_id') school_id: number) {

        const school = await this.schoolService.getSchoolById(school_id);

        this.schoolException.checkThrowSchool(!school, 'not',['school_id']);

        return school;
    }

    @ApiOperation({summary: 'Добавить школу'})
    @ApiResponse({status: 200, type: School})
    @HttpCode(201)
    @Post()
    async create(@Body() schoolDto: SchoolCreateDto) {

        const school = await this.schoolService.getSchoolByParam(schoolDto);

        this.schoolException.checkThrowSchool(school, 'yep',['name', 'city', 'street' ,'homeNumber']);

        return this.schoolService.createSchool(schoolDto);
    }

    @ApiOperation({summary: 'Изменить данные школы'})
    @ApiResponse({status: 200, type: School})
    @HttpCode(200)
    @Put(':school_id')
    async update(@Param('school_id') school_id: number, @Body() schoolDto: SchoolCreateDto) {

        const school = await this.schoolService.getSchoolById(school_id);

        this.schoolException.checkThrowSchool(!school, 'not',['school_id']);

        return this.schoolService.updateSchool(school_id, schoolDto);
    }

    @ApiOperation({summary: 'Удалить школу'})
    @ApiResponse({status: 200, type: SchoolDeleteResponseDto})
    @HttpCode(200)
    @Delete(':school_id')
    async remove(@Param('school_id') school_id: number) {

        const school = await this.schoolService.getSchoolById(school_id);

        this.schoolException.checkThrowSchool(!school, 'not',['school_id']);

        return this.schoolService.removeSchool(school_id);
    }
}
