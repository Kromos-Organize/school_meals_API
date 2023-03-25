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

        const checkedMeals = await this.typeMenuQueryRepo.getTypesMenuByVisit(studentId, meals)

        if (checkedMeals.length !== meals.length) throw new NotFoundException(`${meals} not found in type_menu`)

       return  await  this.mealsRepository.addStudentVisit(studentId, meals)
    }
}