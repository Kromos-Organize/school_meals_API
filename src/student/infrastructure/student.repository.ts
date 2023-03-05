import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Student } from '../domain/entities/student.model';
import {
    IUpdateStudent,
    StudentCreationAttrs,
} from '../domain/dto/student-service.dto';
import { Sequelize } from 'sequelize-typescript';
import { PhoneParentsModel } from '../domain/entities/phone-parents.model';

@Injectable()
export class StudentRepository {
    constructor(
        @InjectModel(Student) private studentRepository: typeof Student,
        @InjectModel(PhoneParentsModel)
        private parentsPhoneModel: typeof PhoneParentsModel,
        private sequelize: Sequelize,
    ) {}

    async createStudent(studentDto: StudentCreationAttrs) {
        const transaction = await this.sequelize.transaction();

        try {
            const student = await this.studentRepository.create(studentDto, {
                transaction: transaction,
            });

            await this.parentsPhoneModel.create(
                {
                    student_id: student.student_id,
                    m_phone: studentDto.m_phone,
                    f_phone: studentDto.f_phone,
                },
                { transaction: transaction },
            );

            await transaction.commit();
            return student;
        } catch (e) {
            console.log(e);
            await transaction.rollback();
        }
    }

    async updateStudent(student_id: number, studentDto: IUpdateStudent) {
        const studentInstance = await this.studentRepository.findOne({
            where: { student_id },
        });

        if (!studentInstance) return false;

        const transaction = await this.sequelize.transaction();

        try {
            await studentInstance.update(studentDto, { transaction: transaction });

            await this.parentsPhoneModel.update(
                {
                    m_phone: studentDto.m_phone,
                    f_phone: studentDto.f_phone,
                },
                {
                    where: {
                        student_id: student_id,
                    },
                    transaction: transaction,
                },
            );

            const result = await studentInstance.save();
            await transaction.commit();
            return result;
        } catch (e) {
            console.log(e);
            await transaction.rollback();
        }
    }

    async removeStudent(student_id: number) {
        const result = await this.studentRepository.destroy({
            where: { student_id },
        });

        await this.parentsPhoneModel.destroy({ where: { student_id } });

        return result && { student_id };
    }
}