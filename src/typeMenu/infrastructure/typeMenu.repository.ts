import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {TypeMenu} from "../domain/entity/type-menu.model";
import {ITypeMenuCreateAttr, ITypeMenuUpdate} from "../domain/dto/typeMenu-service.dto";

@Injectable()
export class TypeMenuRepository {

    constructor(
        @InjectModel(TypeMenu) private typeMenuRepository: typeof TypeMenu,
    ) { }

    async createTypeMenu(typeMenuDto: ITypeMenuCreateAttr) {

        return await this.typeMenuRepository.create(typeMenuDto);
    }

    async updateTypeMenu(type_id: number, typeMenuDto: ITypeMenuUpdate) {

        const typeMenuInstance = await this.typeMenuRepository.findOne({ where: { type_id }});

        if (!typeMenuInstance) return false;

        await typeMenuInstance.update({...typeMenuDto});

        return await typeMenuInstance.save();
    }

    async removeTypeMenu(type_id: number) {

        const result = await this.typeMenuRepository.destroy({ where: { type_id }});

        return result && { type_id };
    }
}