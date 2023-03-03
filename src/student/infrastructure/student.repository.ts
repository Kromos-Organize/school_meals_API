import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Student} from "../domain/entities/student.model";
import {IUpdateStudent, StudentCreationAttrs} from "../domain/dto/student-service.dto";

@Injectable()
export class StudentRepository {

    constructor(@InjectModel(Student) private studentRepository: typeof Student) { }

    async createStudent(studentDto: StudentCreationAttrs) {

        return await this.studentRepository.create(studentDto);
    }

    async updateStudent(student_id: number, studetnDto: IUpdateStudent) {

        const studentInstance = await this.studentRepository.findOne({where: { student_id }});

        if (!studentInstance) return false;

        await studentInstance.update(studetnDto);

        return await studentInstance.save();
    }

    async removeStudent(student_id: number) {

        const result = await this.studentRepository.destroy({ where: { student_id } });

        return result && { student_id }
    }
}