import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {Meals} from "./domain/entity/meals.model";
import {MealsController} from "./api/meals.controller";
import {BadCheckEntitiesException} from "../helpers/exception/BadCheckEntitiesException";
import {Student} from "../student/domain/entities/student.model";
import {PhoneParents} from "../student/domain/entities/phone-parents.model";
import {MealsRepo} from "./infrastructure/meals.repo";
import {MealsQueryRepo} from "./infrastructure/meals.query.repo";
import {MealsService} from "./application/meals.service";
import {TypeMenu} from "../typeMenu/domain/entity/type-menu.model";
import {ClassModule} from "../class/class.module";
import {StudentModule} from "../student/student.module";
import {TypeMenuModule} from "../typeMenu/typeMenu.module";
import {AppGateway} from "../gateway/app.gateway";
import {GatewayModule} from "../gateway/gateway.module";
import {AuthModule} from "../auth/auth.module";
import {UserModule} from "../users/userModule";
import {AdminModule} from "../admin/admin.module";

@Module({
    imports: [
        SequelizeModule.forFeature([Meals, Student, PhoneParents, TypeMenu]),
        ClassModule,
        StudentModule,
        TypeMenuModule,
        GatewayModule,
        AuthModule,
        UserModule,
        AdminModule
    ],
    controllers: [MealsController],
    providers: [
        MealsService,
        MealsRepo,
        MealsQueryRepo,
        BadCheckEntitiesException,
        AppGateway

    ],
    exports: [
        MealsQueryRepo,
        MealsRepo
    ]
})

export class MealsModule {
}