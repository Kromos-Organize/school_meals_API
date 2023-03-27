import {InjectModel} from "@nestjs/sequelize";
import {Meals} from "../domain/entity/meals.model";

export class MealsRepo {

    constructor(
        @InjectModel(Meals) private mealsRepo: typeof Meals,
    ) { }

    async addStudentVisit(student_id: number, meals: number[]) {

     return  await this.mealsRepo.create({student_id,  meals, })
    }

    async deleteStudentVisitByDate(student_id: number, date: Date) {

        return await this.mealsRepo.destroy({where: {student_id, date}})
    }
}