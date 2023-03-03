import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Class} from "../domain/entities/class.model";
import {ICreateClass, IUpdateClass} from "../domain/dto/class-service.dto";

@Injectable()
export class ClassRepository {

    constructor(@InjectModel(Class) private classRepository: typeof Class) { }

    async createClass(classDto: ICreateClass) {

        return await this.classRepository.create(classDto);
    }

    async updateClass(class_id: number, classDto: IUpdateClass) {

        const classInstance = await this.classRepository.findOne({where: { class_id }});

        if (!classInstance) return false;

        await classInstance.update(classDto);

        return await classInstance.save();
    }

    async removeClass(class_id: number) {

        const result = await this.classRepository.destroy({ where: { class_id } });

        return result && { class_id }
    }
}