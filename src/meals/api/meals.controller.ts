import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Query, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {BadCheckEntitiesException} from "../../helpers/exception/BadCheckEntitiesException";
import {BadRequestResult} from "../../helpers/exception/badRequestResult";
import {Meals} from "../domain/entity/meals.model";
import {StudentService} from "../../student/application/student.service";
import {MealsService} from "../application/meals.service";
import {StudentVisitDto} from "../domain/dto/student.visit.dto";
import {VisitDateQueryDto} from "../domain/dto/meals-service.dto";
import {ClassService} from "../../class/application/class.service";

@ApiTags('Журнал визитов столовой учениками')
@ApiBearerAuth()
@ApiResponse({status: 401, description: 'Некорректный аксесс-токен'})
@Controller('meals')
@UseGuards(AuthGuard('jwt'))
export class MealsController {

    constructor(
        private mealsService: MealsService,
        private studentService: StudentService,
        private classService: ClassService,
        private badException: BadCheckEntitiesException,
    ) { }

    @ApiOperation({summary: 'Внести посещение столовой учеником'})
    @ApiResponse({status: 200, type: Meals, description: 'Успешное добавление визита столовой учеником'})
    @ApiResponse({status: 400, type: BadRequestResult, description: BadCheckEntitiesException.errorMessage('student','not')})
    @ApiResponse({status: 404, type: '', description: 'Тип меню не найден'})
    @HttpCode(200)
    @Post('student')
    async addVisitByStudent(@Body() dto: StudentVisitDto) {

        const student = await this.studentService.getStudentById(dto.student_id);

        this.badException.checkAndGenerateException(!student, 'student','not',['student_id']);

        return await this.mealsService.addStudentVisit(dto)
    }

    @ApiOperation({summary: 'Внести посещение столовой классом'})
    @ApiResponse({status: 200, type: Meals, description: 'Успешное добавление визита столовой классом'})
    @ApiResponse({status: 400, type: BadRequestResult, description: BadCheckEntitiesException.errorMessage('student','not')})
    @ApiResponse({status: 404, type: '', description: 'Тип меню не найден'})
    @HttpCode(200)
    @Post('class/:class_id')
    async addVisitByClass(@Param('class_id', ParseIntPipe) classId: number,
                            @Body() dto: StudentVisitDto[]) {

        const classInst = await this.classService.getClassById(classId);

        this.badException.checkAndGenerateException(!classInst, 'class','not',['class_id']);

        return await this.mealsService.addClassVisit(classId, dto)
    }

    @ApiOperation({summary: 'Удалить посещение столовой учеником'})
    @ApiResponse({status: 200, type: Meals, description: 'Успешное удаление визита столовой учеником'})
    @ApiResponse({status: 400, type: BadRequestResult, description: BadCheckEntitiesException.errorMessage('student','not')})
    @HttpCode(200)
    @Delete('student/:student_id')
    async deleteVisitByStudent(@Param('student_id', ParseIntPipe) studentId: number,
                               @Query() query: VisitDateQueryDto) {

        const student = await this.studentService.getStudentById(studentId);

        this.badException.checkAndGenerateException(!student, 'student','not',['student_id']);

        return await this.mealsService.deleteStudentVisit(studentId, query.date)
    }

    @ApiOperation({summary: 'Удалить посещение столовой классом'})
    @ApiResponse({status: 200, type: Meals, description: 'Успешное удаление визита столовой классом'})
    @ApiResponse({status: 400, type: BadRequestResult, description: BadCheckEntitiesException.errorMessage('student','not')})
    @HttpCode(200)
    @Delete('class/:class_id')
    async deleteVisitByClass(@Param('class_id', ParseIntPipe) classId: number,
                               @Query() query: VisitDateQueryDto) {

        const classInst = await this.classService.getClassById(classId);

        this.badException.checkAndGenerateException(!classInst, 'class','not',['class_id']);

        return await this.mealsService.deleteClassVisit(classId, query.date)
    }

    @ApiOperation({summary: 'Получить все посещение столовой  (по дате)'})
    @ApiResponse({status: 200, type: Meals, description: 'Успешное получение всех визитов столовой (на дату)'})
    @HttpCode(200)
    @Get()
    async getAllVisitsByDate(  @Query() query: VisitDateQueryDto) {

        return await this.mealsService.getAllVisitsByDate( query.date)
    }
}