import {InjectModel} from "@nestjs/sequelize";
import {Meals} from "../domain/entity/meals.model";

export class MealsRepo {

    constructor(
        @InjectModel(Meals) private mealsRepo: typeof Meals,
    ) { }

    async addStudentVisit(student_id: number, meals: number[]) {

     return  await this.mealsRepo.create({student_id,  meals, })
    }
}