import {forwardRef, Module} from "@nestjs/common";
import {ClassService} from "./application/class.service";
import {ClassController} from "./api/class.controller";
import {SequelizeModule} from "@nestjs/sequelize";
import {Class} from "./domain/entities/class.model";
import {SchoolModule} from "../school/school.module";
import {AuthModule} from "../auth/auth.module";


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