import {Injectable} from "@nestjs/common";
import {ICreateClass, IUpdateClass} from "../domain/dto/class-service.dto";
import {ClassQueryRepository} from "../infrastructure/class.query.repository";
import {ClassRepository} from "../infrastructure/class.repository";

@Injectable()
export class ClassService {

    constructor(
        private classQueryRepository: ClassQueryRepository,
        private classRepository: ClassRepository
    ) { }

    async getAll(school_id: number) {

        return await this.classQueryRepository.getAll(school_id);
    }

    async getClassById(class_id: number) {

        return await this.classQueryRepository.getClass(class_id);
    }

    async getClassByParams(classParams: ICreateClass) {

        return await this.classQueryRepository.getClassParam(classParams);
    }

    async create(classDto: ICreateClass) {

        return await this.classRepository.createClass(classDto);
    }

    async update(class_id: number, classDto: IUpdateClass) {

        return await this.classRepository.updateClass(class_id, classDto);
    }

    async remove(class_id: number) {

        return await this.classRepository.removeClass(class_id);
    }
}