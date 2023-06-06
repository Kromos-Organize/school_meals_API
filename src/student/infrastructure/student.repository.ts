import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Student} from "../domain/entities/student.model";
import {IUpdateStudent, StudentCreationAttrs} from "../domain/dto/student-service.dto";
import { Sequelize } from "sequelize-typescript";
import { PhoneParents } from "../domain/entities/phone-parents.model";

@Injectable()
export class StudentRepository {

    constructor(
        @InjectModel(Student) private studentRepository: typeof Student,
        @InjectModel(PhoneParents) private parentsPhoneModel: typeof PhoneParents,
        private sequelize: Sequelize,
    ) {}

    async createStudent(studentDto: StudentCreationAttrs) {

        const transaction = await this.sequelize.transaction();

        try {
            const student = await this.studentRepository.create(studentDto, { transaction: transaction, });

            const phoneStudent =  {
                student_id: student.dataValues.student_id,
                m_phone: studentDto.phoneParents?.m_phone ?? null,
                f_phone: studentDto.phoneParents?.f_phone ?? null,
            }

            await this.parentsPhoneModel.create( phoneStudent, { transaction: transaction }, );

            await transaction.commit();
            return student;

        } catch (e) {

            await transaction.rollback();
        }
    }

    async updateStudent(student_id: number, studentDto: IUpdateStudent) {

        const studentInstance = await this.studentRepository.findOne({ where: { student_id }, });

        if (!studentInstance) return false;

        const transaction = await this.sequelize.transaction();

        try {

            await studentInstance.update(studentDto, { transaction: transaction });

            const phoneUpdates = studentDto.phoneParents ? {
                m_phone: studentDto.phoneParents.m_phone,
                f_phone: studentDto.phoneParents.f_phone,
            } : null

            await this.parentsPhoneModel.update( phoneUpdates , {where: { student_id, }, transaction, }, );

            const result = await studentInstance.save();
            await transaction.commit();

            return result;

        } catch (e) {

            await transaction.rollback();
        }
    }

    async removeStudent(student_id: number) {

        const result = await this.studentRepository.destroy({ where: { student_id }, });

        await this.parentsPhoneModel.destroy({ where: { student_id } });

        return result && { student_id };
    }
}