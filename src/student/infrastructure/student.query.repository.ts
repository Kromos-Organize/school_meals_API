import {Injectable, Scope} from "@nestjs/common";
import {Student} from "../domain/entities/student.model";
import {InjectModel} from "@nestjs/sequelize";
import {IParamStudent} from "../domain/dto/student-service.dto";
import {PhoneParents} from '../domain/entities/phone-parents.model';
import {Sequelize} from "sequelize-typescript";

@Injectable({scope: Scope.DEFAULT})
export class StudentQueryRepository {

    constructor(@InjectModel(Student) private studentRepository: typeof Student,
                private readonly sequelize: Sequelize) {
    }


    async getAllStudentToClass(class_id: number) {

        return await this.studentRepository.findAll({include: {model: PhoneParents}, where: {class_id},});
    }

    async getStudentById(student_id: number) {

        return await this.studentRepository.findOne({include: {model: PhoneParents}, where: {student_id},});
    }

    async getStudentByParams(studentParam: IParamStudent) {

        return await this.studentRepository.findOne({where: {...studentParam}})
    }

    async countAllStudentsFromClass(class_id: number) {

        return await this.studentRepository.count({where: {class_id}});
    }

    async countAllStudentsFromSchoolByClass(class_id: number) {

        const res: any = await this.sequelize.query(`
        
            SELECT COUNT(*)
            FROM CLASS CL
            JOIN SCHOOL SC USING (SCHOOL_ID)
            JOIN STUDENT ST USING (SCHOOL_ID)
            WHERE CL.CLASS_ID = :class_id
            
        `, {replacements:{class_id}})

    return res[0]?.count
    }

}