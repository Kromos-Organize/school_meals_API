import {BadRequestException, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Class} from "../model/class.model";
import {CreateClassDto, UpdateClassDto} from "../dto/create-class.dto";
import {SchoolService} from "./school.service";

@Injectable()
export class ClassService {

    constructor(@InjectModel(Class) private classRepo: typeof Class,
                private schoolService: SchoolService) { }

    async getAll(school_id: number) {

        return await this.classRepo.findAll({where: {school_id}})
    }

    async get(class_id: number) {

        return await this.searchClass(class_id);
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

    async remove(class_id: number) {

        const result = await this.classRepo.destroy({where: {class_id}})

        return result ? {message: "Класс удален"} : {message: "Класс не найден."}
    }

    async searchClass(class_id: number) {

        const classSchool = await this.classRepo.findOne({where: {class_id}})

        if (!classSchool) {

            throw new BadRequestException({
                message: 'Класс не найден.',
                field: 'class_id',
            });
        }

        return classSchool
    }
}