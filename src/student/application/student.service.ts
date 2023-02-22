import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Student} from "../domain/entities/student.model";
import {CreateStudentDto, UpdateStudentDto} from "../domain/dto/create-student.dto";
import {SchoolService} from "../../school/application/school.service";
import {ClassService} from "../../class/application/class.service";

@Injectable()
export class StudentService {

    constructor(@InjectModel(Student) private studentRepo: typeof Student,
                private schoolService: SchoolService,
                private classService: ClassService,
                ) { }

    async getStudentToClass(id: string, class_id: string) {

        return await this.studentRepo.findAll({where: {id, class_id}})
    }

    async getStudentById(id: string) {

        const student = await this.studentRepo.findOne({where: {id}})

        if (!student) {

            throw new BadRequestException({
                message: 'Ученик не найден',
                param: 'id',
            });
        }

        return student;
    }

    async create(studentDto: CreateStudentDto) {

        await this.schoolService.get(+studentDto.id);
        await this.classService.get(+studentDto.class_id);

        const student = await this.studentRepo.findOne({
            where: {
                id: studentDto.id,
                class_id: studentDto.class_id,
                fname: studentDto.fname,
                name: studentDto.name,
            }
        })

        if (student) {

            throw new BadRequestException({
                message: 'Ученик уже добавлен',
                fields: ['id','class_id','fname','name'],
            });
        }

        return await this.studentRepo.create(studentDto);
    }

    async updateStudent(id: string, studentDto: UpdateStudentDto) {

        const student = await this.studentRepo.findOne({where: {id}})

        if (!student) {

            throw new BadRequestException({
                message: 'Ученик не найден',
                param: 'id',
            });
        }

        return await student.update(studentDto);
    }

    async removeStudent(id: string) {

        const result = await this.studentRepo.destroy({where: {id}});

        return result ? {message: "Ученик удален."} : {message: "Ученик не найдена."}
    }
}
