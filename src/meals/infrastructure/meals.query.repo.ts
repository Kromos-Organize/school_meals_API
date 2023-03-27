import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Meals} from "../domain/entity/meals.model";

@Injectable()
export class MealsQueryRepo {

    constructor(
        @InjectModel(Meals) private mealsRepo: typeof Meals,
    ) { }

    async getAllVisitsByDate(date: Date) {

        return date ? await this.mealsRepo.findAll({where: {date}})
            : await this.mealsRepo.findAll()
    }
}