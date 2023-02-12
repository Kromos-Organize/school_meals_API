import {Module} from "@nestjs/common";
import {ClassService} from "../service/class.service";
import {ClassController} from "../controller/class.controller";
import {SequelizeModule} from "@nestjs/sequelize";
import {Class} from "../model/class.model";
import {SchoolModule} from "./school.module";


@Module({
    providers: [ClassService],
    controllers: [ClassController],
    imports: [
        SequelizeModule.forFeature([Class]),
        SchoolModule
    ],
    exports: [
        ClassService
    ]
})
export class ClassModule {}