import {InjectModel} from "@nestjs/sequelize";

import {Injectable, Scope} from "@nestjs/common";
import {ICreateClass} from "../domain/dto/class-service.dto";
import { Class } from "../domain/entity/class.model";
import { User } from 'src/users/domain/entities/user.model';

@Injectable({ scope: Scope.DEFAULT })
export class ClassQueryRepository {

    @InjectModel(Class) private classRepo: typeof Class;

    async getAll(school_id: number) {

        return await this.classRepo.findAll({where: {school_id}, include: [{ model: User, attributes: ['id', 'fname', 'name', 'lname']}]});
    }

    async getClass(class_id: number) {

        return await this.classRepo.findOne({where: { class_id }})
    }

    async getClassParam(classData: ICreateClass) {

        return await this.classRepo.findOne({ where: { school_id: classData.school_id, number: classData.number, type: classData.type } });
    }

    async checkUserForClassById(user_id: number) {

        return await this.classRepo.findOne({ where: { user_id } });
    }

    async getCountClassesBySchool(school_id: number) {

      const result = await this.classRepo.findAll({ where: { school_id: school_id }});

      return { count: result.length };
    }
}