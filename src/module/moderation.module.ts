import {forwardRef, Module} from '@nestjs/common';
import {ModerationController} from "../controller/moderation.controller";
import {ModerationService} from "../service/moderation.service";
import {SequelizeModule} from "@nestjs/sequelize";
import {Moderation} from "../model/moderation.model";
import {JwtModule} from "@nestjs/jwt";
import {EmployeeModule} from "./employee.module";
import {Employee} from "../model/employee.model";

@Module({
    providers: [ModerationService],
    controllers: [ModerationController],
    imports: [
        SequelizeModule.forFeature([Moderation, Employee]),
        JwtModule,
        forwardRef(() => EmployeeModule)
    ],
    exports: [ModerationService]
})
export class ModerationModule {}
