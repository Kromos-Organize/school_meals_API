import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {ICreateClass, IUpdateClass} from "../domain/dto/class-service.dto";
import {Class} from "../domain/entity/class.model";

@Injectable()
export class ClassRepository {

    constructor(@InjectModel(Class) private classRepository: typeof Class) { }

    async createClass(classDto: ICreateClass) {

        return await this.classRepository.create(
            { school_id: classDto.school_id, user_id: classDto.user_id, number: classDto.number, type: classDto.type, category: classDto.category });
    }

    async updateClass(class_id: number, classDto: IUpdateClass) {

        const classInstance = await this.classRepository.findOne({where: { class_id }});

        if (!classInstance) return false;

        await classInstance.update(
            {number: classDto.number, type: classDto.type, category: classDto.category}
        );

        return await classInstance.save();
    }

    async removeClass(class_id: number) {

        const result = await this.classRepository.destroy({ where: { class_id } });

        return result && { class_id }
    }
}