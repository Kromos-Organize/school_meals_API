import {Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {StudentService} from "../application/student.service";
import {Student} from "../domain/entities/student.model";
import {CreateStudentDto, UpdateStudentDto} from "../domain/dto/create-student.dto";
import {AuthGuard} from "@nestjs/passport";

@ApiTags('Ученики')
@Controller('student')
@UseGuards(AuthGuard())
export class StudentController {

    constructor(private studentService: StudentService) { }

    @ApiOperation({summary: 'Получение списка учеников класса'})
    @ApiResponse({status: 200, type: [Student]})
    @Get()
    getStudentToClass(@Query('school_id') school_id: string, @Query('class_id') class_id: string) {

        return this.studentService.getStudentToClass(school_id, class_id);
    }

    @ApiOperation({summary: 'Получить данные ученика'})
    @ApiResponse({status: 200, type: Student})
    @Get(':student_id')
    getStudentById(@Param('student_id') student_id: string) {

        return this.studentService.getStudentById(student_id);
    }

    @ApiOperation({summary: 'Добавление ученика в класс'})
    @ApiResponse({status: 201, type: Student})
    @Post()
    create(@Body() studentDto: CreateStudentDto) {

        return this.studentService.create(studentDto);
    }

    @ApiOperation({summary: 'Изменение данных ученика'})
    @ApiResponse({status: 200, type: Student})
    @Put(':student_id')
    update(@Param('student_id') student_id: string, @Body() studentDto: UpdateStudentDto) {

        return this.studentService.updateStudent(student_id, studentDto);
    }

    @ApiOperation({summary: 'Удалить ученика'})
    @ApiResponse({status: 200, type: ''})
    @Delete(':student_id')
    remove(@Param('student_id') student_id: string){

        return this.studentService.removeStudent(student_id);
    }
}
