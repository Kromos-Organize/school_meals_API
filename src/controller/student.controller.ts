import {Body, Controller, Get, Param, Post, UsePipes} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {StudentService} from "../service/student.service";
import {Student} from "../model/student.model";
import {CreateStudentDto} from "../dto/create-student.dto";
import {ValidationBody} from "../validate/valdationBody.pipe";
import {ValidateParams} from "../validate/validateParams.pipe";

@ApiTags('Ученики')
@Controller('student')
export class StudentController {

    constructor(private studentService: StudentService) { }

    @ApiOperation({summary: 'Получение списка учеников класса'})
    @ApiResponse({status: 200,type: [Student]})
    @Get('/:id')
    getStudentsByClass(@Param('id') class_id: string) {

    }

    @ApiOperation({summary: 'Добавление ученика в класс'})
    @ApiResponse({status: 200,type: Student})
    @UsePipes(ValidationBody)
    @UsePipes(ValidateParams)
    @Post('/:id')
    create(@Param('id') class_id: string, @Body() studentDto: CreateStudentDto) {

    }
}
