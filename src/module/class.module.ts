import {forwardRef, Module} from "@nestjs/common";
import {ClassService} from "../service/class.service";
import {ClassController} from "../controller/class.controller";
import {SequelizeModule} from "@nestjs/sequelize";
import {Class} from "../model/class.model";
import {SchoolModule} from "./school.module";
import {AuthModule} from "./auth.module";


@Module({
    providers: [ClassService],
    controllers: [ClassController],
    imports: [
        SequelizeModule.forFeature([Class]),
        SchoolModule,
        forwardRef(() => AuthModule),
    ],
    exports: [
        ClassService
    ]
})
export class ClassModule {}