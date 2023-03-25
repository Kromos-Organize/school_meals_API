import {Injectable, Scope} from "@nestjs/common";
import {Student} from "../domain/entities/student.model";
import {InjectModel} from "@nestjs/sequelize";
import {IParamStudent} from "../domain/dto/student-service.dto";
import { PhoneParents } from '../domain/entities/phone-parents.model';

@Injectable({ scope: Scope.DEFAULT })
export class StudentQueryRepository {

    @InjectModel(Student) private studentRepository: typeof Student;

    async getAllStudentToClass(school_id: number, class_id: number) {

        return await this.studentRepository.findAll({ include: { model: PhoneParents }, where: { school_id, class_id }, });
    }

    async getStudentById(student_id: number) {

        return await this.studentRepository.findOne({include: { model: PhoneParents }, where: { student_id }, });
    }

    async getStudentByParams(studentParam: IParamStudent) {

        return await this.studentRepository.findOne({where: { ...studentParam }})
    }
}