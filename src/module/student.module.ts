import { Module } from '@nestjs/common';
import { StudentService } from '../service/student.service';
import { StudentController } from '../controller/student.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Student} from "../model/student.model";

@Module({
  providers: [StudentService],
  controllers: [StudentController],
  imports:[
    SequelizeModule.forFeature([Student])
  ]
})
export class StudentModule {}
