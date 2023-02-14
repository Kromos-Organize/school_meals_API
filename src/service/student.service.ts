import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Student} from "../model/student.model";
import {CreateStudentDto, UpdateStudentDto} from "../dto/create-student.dto";
import {SchoolService} from "./school.service";
import {ClassService} from "./class.service";

@Injectable()
export class StudentService {

    constructor(@InjectModel(Student) private studentRepo: typeof Student,
                private schoolService: SchoolService,
                private classService: ClassService,
                ) { }

    async getStudentToClass(school_id: string, class_id: string) {

        return await this.studentRepo.findAll({where: {school_id, class_id}})
    }

    async getStudentById(student_id: string) {

        const student = await this.studentRepo.findOne({where: {student_id}})

        if (!student) {

            throw new BadRequestException({
                message: 'Ученик не найден',
                param: 'student_id',
            });
        }

        return student;
    }

    async create(studentDto: CreateStudentDto) {

        await this.schoolService.get(+studentDto.school_id);
        await this.classService.get(+studentDto.class_id);

        const student = await this.studentRepo.findOne({
            where: {
                school_id: studentDto.school_id,
                class_id: studentDto.class_id,
                fname: studentDto.fname,
                name: studentDto.name,
            }
        })

        if (student) {

            throw new BadRequestException({
                message: 'Ученик уже добавлен',
                fields: ['school_id','class_id','fname','name'],
            });
        }

        return await this.studentRepo.create(studentDto);
    }

    async updateStudent(student_id: string, studentDto: UpdateStudentDto) {

        const student = await this.studentRepo.findOne({where: {student_id}})

        if (!student) {

            throw new BadRequestException({
                message: 'Ученик не найден',
                param: 'student_id',
            });
        }

        return await student.update(studentDto);
    }

    async removeStudent(student_id: string) {

        const result = await this.studentRepo.destroy({where: {student_id}});

        return result ? {message: "Ученик удален."} : {message: "Ученик не найдена."}
    }
}
