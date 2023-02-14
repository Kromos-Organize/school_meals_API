import {Module} from '@nestjs/common';
import {StudentService} from '../service/student.service';
import {StudentController} from '../controller/student.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Student} from "../model/student.model";
import {SchoolModule} from "./school.module";
import {ClassModule} from "./class.module";

@Module({
    providers: [StudentService],
    controllers: [StudentController],
    imports: [
        SequelizeModule.forFeature([Student]),
        SchoolModule,
        ClassModule
    ]
})
export class StudentModule {
}
