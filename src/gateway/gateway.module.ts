import {forwardRef, Module} from "@nestjs/common";
import {AppGateway} from "./app.gateway";
import {AuthModule} from "../auth/auth.module";
import {AdminModule} from "../admin/admin.module";
import {MealsModule} from "../meals/meals.module";
import {UserModule} from "../users/user.module";

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
