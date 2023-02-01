import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Student} from "./student.model";

@Module({
  providers: [StudentService],
  controllers: [StudentController],
  imports:[
    SequelizeModule.forFeature([Student])
  ]
})
export class StudentModule {}
