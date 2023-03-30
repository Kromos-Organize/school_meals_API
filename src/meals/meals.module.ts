import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {Meals} from "./domain/entity/meals.model";
import {MealsController} from "./api/meals.controller";
import {BadCheckEntitiesException} from "../helpers/exception/BadCheckEntitiesException";
import {Student} from "../student/domain/entities/student.model";
import {PhoneParents} from "../student/domain/entities/phone-parents.model";
import {MealsRepository} from "./infrastructure/meals.repository";
import {MealsQueryRepository} from "./infrastructure/meals-query-repository";
import {MealsService} from "./application/meals.service";
import {TypeMenu} from "../typeMenu/domain/entity/type-menu.model";
import {ClassModule} from "../class/class.module";
import {StudentModule} from "../student/student.module";
import {TypeMenuModule} from "../typeMenu/typeMenu.module";
import {AppGateway} from "../gateway/app.gateway";
import {GatewayModule} from "../gateway/gateway.module";
import {AuthModule} from "../auth/auth.module";
import {AdminModule} from "../admin/admin.module";
import {UserModule} from "../users/user.module";

@Module({
	imports: [
		SequelizeModule.forFeature([Meals, Student, PhoneParents, TypeMenu]),
		ClassModule,
		StudentModule,
		TypeMenuModule,
		GatewayModule,
		AuthModule,
		UserModule,
		AdminModule,
	],
	controllers: [MealsController],
	providers: [
		MealsService,
		MealsRepository,
		MealsQueryRepository,
		BadCheckEntitiesException,
		AppGateway,
	],
	exports: [
		MealsQueryRepository,
		MealsRepository,
	]
})

export class MealsModule {
}