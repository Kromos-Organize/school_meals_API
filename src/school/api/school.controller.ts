import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {SchoolService} from "../application/school.service";
import {CreateSchoolDto} from "../domain/dto/create-school.dto";
import {School} from "../domain/entities/school.model";
import {AuthGuard} from "@nestjs/passport";

@ApiTags('Школа')
@Controller('school')
@UseGuards(AuthGuard())
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
    @Post()
    create(@Body() schoolDto: CreateSchoolDto) {

        return this.schoolService.createSchool(schoolDto)
    }

    @ApiOperation({summary: 'Изменить данные школы'})
    @ApiResponse({status: 200, type: School})
    @Put(':school_id')
    update(@Param('school_id') school_id: number, @Body() schoolDto: CreateSchoolDto) {

        return this.schoolService.updateSchool(school_id, schoolDto);
    }

    @ApiOperation({summary: 'Удалить школу'})
    @ApiResponse({status: 200, type: ''})
    @Delete(':school_id')
    remove(@Param('school_id') school_id: string) {

        return this.schoolService.removeSchool(school_id)
    }
}
