import {Injectable, NotFoundException} from "@nestjs/common";
import {MealsQueryRepo} from "../infrastructure/meals.query.repo";
import {MealsRepo} from "../infrastructure/meals.repo";
import {TypeMenuQueryRepository} from "../../typeMenu/infrastructure/typeMenu.query.repository";

@Injectable()
export class MealsService {
    constructor(
        private mealsQueryRepository: MealsQueryRepo,
        private mealsRepository: MealsRepo,
        private typeMenuQueryRepo: TypeMenuQueryRepository,
    ) { }

    async addStudentVisit(studentId: number, meals: number[]) {

        const checkedMeals = await this.typeMenuQueryRepo.getTypesMenuByVisit(meals)

        if (checkedMeals.length !== meals.length) throw new NotFoundException(`некоторые из типов меню ${meals} не найдены`)

       return  await  this.mealsRepository.addStudentVisit(studentId, meals)
    }

    async deleteStudentVisit(studentId: number, date: Date) {

        return await this.mealsRepository.deleteStudentVisitByDate(studentId, date)
    }

    async getAllVisitsByDate(date: Date) {

        return await this.mealsQueryRepository.getAllVisitsByDate(date)
    }
}