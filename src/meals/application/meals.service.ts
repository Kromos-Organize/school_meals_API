import {Injectable, NotFoundException} from "@nestjs/common";
import {MealsQueryRepo} from "../infrastructure/meals.query.repo";
import {MealsRepo} from "../infrastructure/meals.repo";
import {TypeMenuQueryRepository} from "../../typeMenu/infrastructure/typeMenu.query.repository";
import {IMealsCreateAttr} from "../domain/dto/meals-service.dto";
import {StudentQueryRepository} from "../../student/infrastructure/student.query.repository";
import {AppGateway} from "../../gateway/app.gateway";

@Injectable()
export class MealsService {
    constructor(
        private mealsQueryRepository: MealsQueryRepo,
        private mealsRepository: MealsRepo,
        private typeMenuQueryRepo: TypeMenuQueryRepository,
        private studentsQueryRepo: StudentQueryRepository,
        private gateWay: AppGateway
    ) {
    }


    async addStudentVisit(dto: IMealsCreateAttr) {

        const checkedMeals = await this.typeMenuQueryRepo.getTypesMenuByVisit(dto.meals)

        if (checkedMeals.length !== dto.meals.length) throw new NotFoundException(`некоторые из типов меню ${dto.meals} не найдены`)

        return await this.mealsRepository.addStudentVisit(dto)
    }

    async deleteStudentVisit(studentId: number, date: Date) {

        return await this.mealsRepository.deleteStudentVisitByDate(studentId, date)
    }

    async getAllVisitsByDate(date: Date) {

        return await this.mealsQueryRepository.getAllVisitsByDate(date)
    }

    async addClassVisit(classId: number, dto: IMealsCreateAttr[]) {

        const allMeals: Array<number> = Array.from(new Set(
            dto.reduce((acc, cur) => {
                acc.push(...cur.meals)
                return acc
            }, [])))

        const checkedMeals = await this.typeMenuQueryRepo.getTypesMenuByVisit(allMeals)

        if (checkedMeals.length !== allMeals.length) throw new NotFoundException(`некоторые из типов меню ${allMeals} не найдены`)

        const result = await this.mealsRepository.addClassVisit(dto)

        const studentsCount = await this.studentsQueryRepo.countAllStudentsFromClass(classId)

        const eatenCount = await this.mealsQueryRepository.getAllEatenStudentsFromClassToday(classId)

        if (studentsCount == eatenCount) {

            this.gateWay.wss.emit('one_meals_today', JSON.stringify(`Данные по питанию за ${classId} отправлены`))
        }

        const allEatenStudentsToday = await this.mealsQueryRepository.getAllVisitsByDate(new Date())

        const allStudentsFromSchool = await this.studentsQueryRepo.countAllStudentsFromSchoolByClass(classId)

        if (allEatenStudentsToday.length == allStudentsFromSchool) {

            this.gateWay.wss.emit('calc_meals_today ', JSON.stringify(`Данные за все классы отправлены`))
        }

        return result


    }

    async deleteClassVisit(classId: number, date: Date) {

        const classStudents = await this.studentsQueryRepo.getAllStudentToClass(classId)

        const student_id = classStudents.map((s) => s.student_id)

        return await this.mealsRepository.deleteClassVisitByDate(student_id, date)
    }
}