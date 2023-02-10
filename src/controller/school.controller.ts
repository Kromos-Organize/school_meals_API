import {Body, Controller, Get, Post, UsePipes} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {SchoolService} from "../service/school.service";
import {CreateSchoolDto} from "../dto/create-school.dto";
import {School} from "../model/school.model";
import {ValidationBody} from "../pipes/valdationBody.pipe";

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

    @ApiOperation({summary: 'Добавить школу'})
    @ApiResponse({status: 200, type: School})
    @UsePipes(ValidationBody)
    @Post()
    create(@Body() schoolDto: CreateSchoolDto) {

        return this.schoolService.createSchool(schoolDto)
    }
}
