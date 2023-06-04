import {Injectable} from "@nestjs/common";
import {MenuQueryRepository} from "../infrastructure/menu.query.repository";
import {MenuRepository} from "../infrastructure/menu.repository";
import {IMenuCreateAttr, IMenuUpdate} from "../domain/dto/menu-service.dto";


@Injectable()
export class MenuService {

    constructor(
        private menuQueryRepository: MenuQueryRepository,
        private menuRepository: MenuRepository,
    ) { }

    async getAllMenuBySchoolDate(school_id: number, date:Date) {

        return await this.menuQueryRepository.getAllMenuBySchoolDate(school_id, date);
    }

    async getMenuById(menu_id: number) {

        return await this.menuQueryRepository.getMenuById(menu_id);
    }

    async getMenuBySchoolType(school_id: number, type_id: number, date: Date) {

        return await this.menuQueryRepository.getMenuBySchoolType(school_id, type_id, date);
    }

    async createMenu(menuDto: IMenuCreateAttr){

        return await this.menuRepository.createMenu(menuDto);
    }

    async updateMenu(menu_id: number, menuDto: IMenuUpdate) {

        return await this.menuRepository.updateMenu(menu_id, menuDto);
    }

    async removeMenu(menu_id: number) {

        return await this.menuRepository.removeMenu(menu_id);
    }
}