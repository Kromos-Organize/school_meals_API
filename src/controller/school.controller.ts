import {Body, Controller, Delete, Get, Param, Post, Put, UsePipes} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {SchoolService} from "../service/school.service";
import {CreateSchoolDto} from "../dto/create-school.dto";
import {School} from "../model/school.model";
import {ValidationBody} from "../pipes/valdationBody.pipe";
import {MessageDto} from "../dto/message.dto";

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
    @Get(':school_id')
    get(@Param('school_id') school_id: number) {

        return this.schoolService.get(school_id);
    }

    @ApiOperation({summary: 'Добавить школу'})
    @ApiResponse({status: 200, type: School})
    @UsePipes(ValidationBody)
    @Post()
    create(@Body() schoolDto: CreateSchoolDto) {

        return this.schoolService.createSchool(schoolDto)
    }

    @ApiOperation({summary: 'Изменить данные школы'})
    @ApiResponse({status: 200, type: School})
    @UsePipes(ValidationBody)
    @Put(':school_id')
    update(@Param('school_id') school_id: number, @Body() schoolDto: CreateSchoolDto) {

        return this.schoolService.updateSchool(school_id, schoolDto);
    }

    @ApiOperation({summary: 'Удалить школу'})
    @ApiResponse({status: 200, type: MessageDto})
    @Delete(':school_id')
    remove(@Param('school_id') school_id: string) {

        return this.schoolService.removeSchool(school_id)
    }
}
