import {Body, Controller, Get, Param, Post, UsePipes} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {SchoolService} from "../service/school.service";
import {CreateSchoolDto} from "../dto/create-school.dto";
import {School} from "../model/school.model";
import {ValidationBody} from "../pipes/valdationBody.pipe";
import {ValidateParams} from "../pipes/validateParams.pipe";

@ApiTags('Школа')
@Controller('school')
export class SchoolController {

    constructor(private schoolService: SchoolService) { }

    @ApiOperation({summary: 'Получить список школ'})
    @ApiResponse({status: 200, type: [School]})
    @Get()
    getAll() {

        return this.schoolService.getAllSchool();
    }

    @ApiOperation({summary: 'Получить данные школы'})
    @ApiResponse({status: 200, type: School})
    @UsePipes(ValidateParams)
    @Get(':id')
    get(@Param('id') id: number,) {

        return this.schoolService.get(id);
    }

    @ApiOperation({summary: 'Добавить школу'})
    @ApiResponse({status: 200, type: School})
    @UsePipes(ValidationBody)
    @Post()
    create(@Body() schoolDto: CreateSchoolDto) {

        return this.schoolService.createSchool(schoolDto)
    }
}
