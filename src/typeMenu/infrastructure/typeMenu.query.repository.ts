import {Injectable, Scope} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {TypeMenu} from "../domain/entity/type-menu.model";

@Injectable({ scope: Scope.DEFAULT })
export class TypeMenuQueryRepository {

    @InjectModel(TypeMenu) typeMenuRepository: typeof TypeMenu;

    async getAllTypeMenuBySchool(school_id: number) {

        return await this.typeMenuRepository.findAll({where: { school_id }})
    }

    async getTypeMenuById(type_id: number) {

        return await this.typeMenuRepository.findOne({ where: { type_id }})
    }

    async getTypeMenuByName(school_id: number, type_menu: string) {

        return await this.typeMenuRepository.findOne({ where: { school_id, type_menu }})
    }

    async getTypesMenuByVisit(meals: number[]) {

        return await this.typeMenuRepository.findAll({where: {type_id: meals}})

    }
}