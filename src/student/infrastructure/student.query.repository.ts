import {Injectable, Scope} from "@nestjs/common";
import {Student} from "../domain/entities/student.model";
import {InjectModel} from "@nestjs/sequelize";
import {IParamStudent} from "../domain/dto/student-service.dto";

@Injectable({ scope: Scope.DEFAULT })
export class StudentQueryRepository {

    @InjectModel(Student) private studentRepository: typeof Student;

    async getAllStudentToClass(school_id: number, class_id: number) {

        return await this.studentRepository.findAll({where: {school_id, class_id}});
    }

    async getStudentById(student_id: number) {

        return await this.studentRepository.findOne({where: {student_id}});
    }

    async getStudentByParams(studentParam: IParamStudent) {

        return await this.studentRepository.findOne({where: { ...studentParam }})
    }
}