import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Meals} from "../domain/entity/meals.model";
import {Sequelize} from "sequelize-typescript";
import {QueryTypes} from "sequelize";

@Injectable()
export class MealsQueryRepository {

    constructor(
        @InjectModel(Meals) private mealsRepo: typeof Meals,
        private readonly sequelize: Sequelize
    ) {
    }

    async getAllVisitsByDate(date: Date) {

        return date ? await this.mealsRepo.findAll({where: {date}})
            : await this.mealsRepo.findAll()
    }

    async getAllEatenStudentsFromClassToday(class_id: number) {

        const result: any = await this.sequelize.query(`
            SELECT COUNT(DISTINCT SM.STUDENT_ID)
            FROM STUDENT_MEALS SM
            JOIN STUDENT ST USING (STUDENT_ID)
            JOIN CLASS CL USING (CLASS_ID)
            WHERE ST.CLASS_ID = :classId AND SM.DATE = :now
                `, {
            replacements: {classId: class_id, now: new Date()}, raw: true, type: QueryTypes.SELECT
        })

        return result[0]?.count

    }
}