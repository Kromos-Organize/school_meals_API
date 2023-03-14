import {Injectable, Scope} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Menu} from "../domain/entity/menu.model";

@Injectable({ scope: Scope.DEFAULT })
export class MenuQueryRepository {

    @InjectModel(Menu) private menuRepository: typeof Menu;

    async getAllMenuBySchoolDate(school_id: number,date: Date) {

        return await this.menuRepository.findAll({ where: { school_id, date }})
    }

    async getMenuById(menu_id: number) {

        return await this.menuRepository.findOne({ where: { menu_id }})
    }

    async getMenuBySchoolType(school_id: number, type_id: number, date: Date) {

        return await this.menuRepository.findOne({ where: { school_id, type_id, date }});
    }
}

