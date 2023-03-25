import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Body, Controller, HttpCode, Param, ParseIntPipe, Post, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {BadCheckEntitiesException} from "../../helpers/exception/BadCheckEntitiesException";
import {BadRequestResult} from "../../helpers/exception/badRequestResult";
import {Meals} from "../domain/entity/meals.model";
import {StudentService} from "../../student/application/student.service";
import {MealsService} from "../application/meals.service";
import {StudentVisitDto} from "../domain/dto/student.visit.dto";

@ApiTags('Журнал визитов столовой учениками')
@ApiBearerAuth()
@ApiResponse({status: 401, description: 'Некорректный аксесс-токен'})
@Controller('meals')
@UseGuards(AuthGuard('jwt'))
export class MealsController {

    constructor(
        private mealsService: MealsService,
        private studentService: StudentService,
        private badException: BadCheckEntitiesException,
    ) { }

    @ApiOperation({summary: 'Внести посещение столовой учеником'})
    @ApiResponse({status: 200, type: Meals, description: 'Успешное добавление визита столовой учеником'})
    @ApiResponse({status: 400, type: BadRequestResult, description: BadCheckEntitiesException.errorMessage('student','not')})
    @HttpCode(200)
    @Post('/:student_id')
    async addVisitByClass(@Param('student_id', ParseIntPipe) studentId: number,
                          @Body() dto: StudentVisitDto) {

        const student = await this.studentService.getStudentById(studentId);

        this.badException.checkAndGenerateException(!student, 'student','not',['student_id']);

        return await this.mealsService.addStudentVisit(studentId, dto.meals)

    }
}