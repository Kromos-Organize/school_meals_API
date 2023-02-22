import {BadRequestException, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Class} from "../domain/entities/class.model";
import {CreateClassDto, UpdateClassDto} from "../domain/dto/create-class.dto";
import {SchoolService} from "../../school/application/school.service";

@Injectable()
export class ClassService {

    constructor(@InjectModel(Class) private classRepo: typeof Class,
                private schoolService: SchoolService) { }

    async getAll(id: number) {

        return await this.classRepo.findAll({where: {id}})
    }

    async get(id: number) {

        return await this.searchClass(id);
    }

    async create(classDto: CreateClassDto) {

        await this.schoolService.get(classDto.school_id);
        const candidateClass = await this.classRepo.findOne({where: {...classDto}});

        if (candidateClass) {

            throw new BadRequestException({
                message: 'Такой класс существует.',
                fields: ['number','type'],
            });
        }

        return await this.classRepo.create(classDto);
    }

    async update(class_id: number, classDto: UpdateClassDto) {

        const classSchool = await this.searchClass(class_id);

        return await classSchool.update(classDto);
    }

    async remove(id: number) {

        const result = await this.classRepo.destroy({where: {id}})

        return result ? {message: "Класс удален"} : {message: "Класс не найден."}
    }

    async searchClass(id: number) {

        const classSchool = await this.classRepo.findOne({where: {id}})

        if (!classSchool) {

            throw new BadRequestException({
                message: 'Класс не найден.',
                fields: ['class_id'],
            });
        }

        return classSchool
    }
}