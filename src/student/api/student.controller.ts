import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import { StudentService } from '../application/student.service';
import { Student } from '../domain/entities/student.model';
import {
    StudentRequestDto,
    UpdateStudentDto,
} from '../domain/dto/student-request.dto';
import { BadCheckEntitiesException } from '../../helpers/exception/BadCheckEntitiesException';
import { SchoolService } from '../../school/application/school.service';
import { ClassService } from '../../class/application/class.service';
import {AuthGuard} from "@nestjs/passport";
import {BadRequestResult} from "../../helpers/exception/badRequestResult";

@ApiTags('Ученики')
@Controller('student')
@UseGuards(AuthGuard())
export class StudentController {

    constructor(
        private schoolService: SchoolService,
        private classService: ClassService,
        private studentService: StudentService,
        private badException: BadCheckEntitiesException,
    ) {}

    @ApiOperation({summary: 'Получение списка учеников класса'})
    @ApiBearerAuth()
    @ApiResponse({status: 200, type: [Student], description: 'Успешное получение списка учеников'})
    @ApiResponse({status: 400, type: BadRequestResult, description: 'Школа/класс не существует'})
    @ApiResponse({status: 401, description: 'Некорректный аксесс-токен'})
    @HttpCode(200)
    @Get()
    async getStudentToClass(@Query('school_id') school_id: number, @Query('class_id') class_id: number) {

        const school = await this.schoolService.getSchoolById(school_id);
        const classSchool = await this.classService.getClassById(class_id);

        this.badException.checkAndGenerateException(!school, 'school','not',['school_id']);
        this.badException.checkAndGenerateException(!classSchool, 'class','not',['classSchool']);

        return this.studentService.getStudentToClass(school_id, class_id);
    }

    @ApiOperation({summary: 'Получить данные ученика'})
    @ApiBearerAuth()
    @ApiResponse({status: 200, type: Student, description: 'Успешное получение данных ученика'})
    @ApiResponse({status: 400, type: BadRequestResult, description: 'Ученик не существует'})
    @ApiResponse({status: 401, description: 'Некорректный аксесс-токен'})
    @HttpCode(200)
    @Get(':student_id')
    async getStudentById(@Param('student_id') student_id: number) {

        const student = await this.studentService.getStudentById(student_id);

        this.badException.checkAndGenerateException(!student, 'student','not',['student_id']);

        return student;
    }

    @ApiOperation({summary: 'Добавление ученика в класс'})
    @ApiBearerAuth()
    @ApiResponse({status: 201, type: Student, description: 'Успешное добавление ученика в класс'})
    @ApiResponse({status: 400, type: BadRequestResult, description: 'Школа/класс не существует / Ученик уже существует'})
    @ApiResponse({status: 401, description: 'Некорректный аксесс-токен'})
    @HttpCode(201)
    @Post()
    async create(@Body() studentDto: StudentRequestDto) {

        const school = await this.schoolService.getSchoolById(studentDto.school_id);
        const classSchool = await this.classService.getClassById(studentDto.class_id);
        const student = await this.studentService.getStudentByParam({
            school_id: studentDto.school_id,
            class_id: studentDto.class_id,
            fname: studentDto.fname,
            name: studentDto.name,
        });

        this.badException.checkAndGenerateException(!school, 'school','not',['school_id']);
        this.badException.checkAndGenerateException(!classSchool, 'class','not',['classSchool']);
        this.badException.checkAndGenerateException(student, 'student','yep',['school_id', 'class_id', 'fname', 'name']);

        return this.studentService.create(studentDto);
    }

    @ApiOperation({summary: 'Изменение данных ученика'})
    @ApiBearerAuth()
    @ApiResponse({status: 200, type: Student, description: 'Успешное изменение данных ученика'})
    @ApiResponse({status: 400, type: BadRequestResult, description: 'Ученик не существует'})
    @ApiResponse({status: 401, description: 'Некорректный аксесс-токен'})
    @HttpCode(200)
    @Put(':student_id')
    async update(@Param('student_id') student_id: number, @Body() studentDto: UpdateStudentDto) {

        const student = await this.studentService.getStudentById(student_id);

        this.badException.checkAndGenerateException(!student, 'student','not',['student_id']);

        return this.studentService.updateStudent(student_id, studentDto);
    }

    @ApiOperation({summary: 'Удалить ученика'})
    @ApiBearerAuth()
    @ApiResponse({status: 200, type: '', description: 'Успешное удаление ученика'})
    @ApiResponse({status: 400, type: BadRequestResult, description: 'Ученик не существует'})
    @ApiResponse({status: 401, description: 'Некорректный аксесс-токен'})
    @HttpCode(200)
    @Delete(':student_id')
    async remove(@Param('student_id') student_id: number) {

        const student = await this.studentService.getStudentById(student_id);

        this.badException.checkAndGenerateException(!student, 'student','not', ['student_id']);

        return this.studentService.removeStudent(student_id);
    }
}
