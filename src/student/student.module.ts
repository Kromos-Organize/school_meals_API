import {forwardRef, Module} from '@nestjs/common';
import {StudentService} from './application/student.service';
import {StudentController} from './api/student.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Student} from "./domain/entities/student.model";
import {SchoolModule} from "../school/school.module";
import {ClassModule} from "../class/class.module";
import {AuthModule} from "../auth/auth.module";
import {BadCheckEntitiesException} from "../helpers/exception/BadCheckEntitiesException";
import {StudentQueryRepository} from "./infrastructure/student.query.repository";
import {StudentRepository} from "./infrastructure/student.repository";
import { PhoneParents } from './domain/entities/phone-parents.model';

@Module({
    providers: [
        StudentQueryRepository,
        StudentRepository,
        StudentService,
        BadCheckEntitiesException,
    ],
    controllers: [StudentController],
    imports: [
        SequelizeModule.forFeature([Student, PhoneParents]),
        SchoolModule,
        ClassModule,
        forwardRef(() => AuthModule),
    ],
})
export class StudentModule {}