import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {StudentService} from "../service/student.service";
import {Student} from "../model/student.model";
import {CreateStudentDto} from "../dto/create-student.dto";

@ApiTags('Ученики')
@Controller('student')
export class StudentController {

    constructor(private studentService: StudentService) { }

    @ApiOperation({summary: 'Получение списка учеников класса'})
    @ApiResponse({status: 200,type: [Student]})
    @Get('/:class_id')
    getStudentsByClass(@Param('class_id') class_id: string) {

    }

    @ApiOperation({summary: 'Добавление ученика в класс'})
    @ApiResponse({status: 200,type: Student})
    @Post('/:class_id')
    create(@Param('class_id') class_id: string, @Body() studentDto: CreateStudentDto) {

    }
}
