import {forwardRef, Module} from "@nestjs/common";
import {AppGateway} from "./app.gateway";
import {AuthModule} from "../auth/auth.module";
import {UserModule} from "../users/userModule";
import {AdminModule} from "../admin/admin.module";
import {MealsModule} from "../meals/meals.module";

@Module({
	imports: [
		AuthModule,
		UserModule,
		AdminModule,
		forwardRef(() => MealsModule),
	],
	providers: [
		AppGateway,
	],
	exports: [AppGateway]
})
export class GatewayModule {
}
