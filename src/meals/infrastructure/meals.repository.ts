import {InjectModel} from "@nestjs/sequelize";
import {Meals} from "../domain/entity/meals.model";
import {IMealsCreateAttr} from "../domain/dto/meals-service.dto";

export class MealsRepository {
	
	constructor(
		@InjectModel(Meals) private mealsRepo: typeof Meals,
	) {
	}
	
	async addStudentVisit(dto: IMealsCreateAttr) {
		
		return await this.mealsRepo.create(dto)
	}
	
	async deleteStudentVisitByDate(student_id: number, date: Date) {
		
		return await this.mealsRepo.destroy({where: {student_id, date}})
	}
	
	async addClassVisit(dto: IMealsCreateAttr[]) {
		
		return await this.mealsRepo.bulkCreate(dto)
	}
	
	async deleteClassVisitByDate(student_id: number[], date: Date) {
		
		return await this.mealsRepo.destroy({where: {date, student_id}})
	}
}