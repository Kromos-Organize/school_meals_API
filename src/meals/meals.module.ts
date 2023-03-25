import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {Meals} from "./domain/entity/meals.model";
import {MealsController} from "./api/meals.controller";
import {BadCheckEntitiesException} from "../helpers/exception/BadCheckEntitiesException";
import {StudentService} from "../student/application/student.service";
import {StudentQueryRepository} from "../student/infrastructure/student.query.repository";
import {StudentRepository} from "../student/infrastructure/student.repository";
import {Student} from "../student/domain/entities/student.model";
import {PhoneParents} from "../student/domain/entities/phone-parents.model";
import {MealsRepo} from "./infrastructure/meals.repo";
import {MealsQueryRepo} from "./infrastructure/meals.query.repo";
import {MealsService} from "./application/meals.service";
import {TypeMenuQueryRepository} from "../typeMenu/infrastructure/typeMenu.query.repository";
import {TypeMenu} from "../typeMenu/domain/entity/type-menu.model";

@Module({
    imports: [SequelizeModule.forFeature([Meals, Student, PhoneParents, TypeMenu])],
    controllers: [MealsController],
    providers: [
        MealsService,
        MealsRepo,
        MealsQueryRepo,
        BadCheckEntitiesException,
        StudentService,
        StudentQueryRepository,
        StudentRepository,
        TypeMenuQueryRepository
    ],
    exports: []
})

export class MealsModule {

}