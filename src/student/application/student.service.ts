import {Injectable} from '@nestjs/common';
import {UpdateStudentDto} from "../domain/dto/student-request.dto";
import {StudentQueryRepository} from "../infrastructure/student.query.repository";
import {StudentRepository} from "../infrastructure/student.repository";
import {IParamStudent, StudentCreationAttrs} from "../domain/dto/student-service.dto";

@Injectable()
export class StudentService {

    constructor(
        private studentQueryRepository: StudentQueryRepository,
        private studentRepository: StudentRepository,
    ) { }

    async getStudentToClass(school_id: number, class_id: number) {

        return await this.studentQueryRepository.getAllStudentToClass(school_id, class_id);
    }

    async getStudentById(student_id: number) {

        return await this.studentQueryRepository.getStudentById(student_id);
    }

    async getStudentByParam(studentParam: IParamStudent) {

        return await this.studentQueryRepository.getStudentByParams(studentParam);
    }

    async create(studentDto: StudentCreationAttrs) {

        const newStudent: StudentCreationAttrs = {
            ...studentDto,
            m_phone: studentDto.m_phone,
            f_phone: studentDto.f_phone,
            isLargeFamilies: false,
        };

        return await this.studentRepository.createStudent(newStudent);
    }

    async updateStudent(student_id: number, studentDto: UpdateStudentDto) {

        return await this.studentRepository.updateStudent(student_id, studentDto);
    }

    async removeStudent(student_id: number) {

        return await this.studentRepository.removeStudent(student_id);
    }
}
