import {InjectModel} from "@nestjs/sequelize";
import {Class} from "../domain/entities/class.model";
import {Injectable, Scope} from "@nestjs/common";
import {ICreateClass} from "../domain/dto/class-service.dto";

@Injectable({ scope: Scope.DEFAULT })
export class ClassQueryRepository {

    @InjectModel(Class) private classRepo: typeof Class;

    async getAll(school_id: number) {

        return await this.classRepo.findAll({where: {school_id}})
    }

    async getClass(class_id: number) {

        return await this.classRepo.findOne({where: { class_id }})
    }

    async getClassParam(classData: ICreateClass) {

        return await this.classRepo.findOne({where: {...classData}});
    }
}