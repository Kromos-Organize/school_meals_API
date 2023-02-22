import {forwardRef, Module} from '@nestjs/common';
import {StudentService} from './application/student.service';
import {StudentController} from './api/student.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Student} from "./domain/entities/student.model";
import {SchoolModule} from "../school/school.module";
import {ClassModule} from "../class/class.module";
import {AuthModule} from "../auth/auth.module";

@Module({
    providers: [StudentService],
    controllers: [StudentController],
    imports: [
        SequelizeModule.forFeature([Student]),
        SchoolModule,
        ClassModule,
        forwardRef(() => AuthModule)
    ]
})
export class StudentModule {
}
