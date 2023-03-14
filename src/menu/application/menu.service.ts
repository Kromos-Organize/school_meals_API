import {Injectable} from "@nestjs/common";
import {TypeMenuQueryRepository} from "../infrastructure/typeMenu.query.repository";
import {TypeMenuRepository} from "../infrastructure/typeMenu.repository";
import {MenuQueryRepository} from "../infrastructure/menu.query.repository";
import {MenuRepository} from "../infrastructure/menu.repository";
import {IMenuCreateAttr, IMenuUpdate, ITypeMenuCreateAttr, ITypeMenuUpdate} from "../domain/dto/menu-service.dto";


@Injectable()
export class MenuService {

    constructor(
        private menuQueryRepository: MenuQueryRepository,
        private menuRepository: MenuRepository,
        private typeMenuQueryRepository: TypeMenuQueryRepository,
        private typeMenuRepository: TypeMenuRepository,
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

    async getAllTypeMenuBySchool(school_id: number) {

        return await this.typeMenuQueryRepository.getAllTypeMenuBySchool(school_id);
    }

    async getTypeMenuById(type_id: number) {

        return await this.typeMenuQueryRepository.getTypeMenuById(type_id);
    }

    async getTypeMenuByName(school_id: number, type_menu: string) {

        return await this.typeMenuQueryRepository.getTypeMenuByName(school_id, type_menu);
    }

    async createTypeMenu(typeMenuDto: ITypeMenuCreateAttr){

        return await this.typeMenuRepository.createTypeMenu(typeMenuDto);
    }

    async updateTypeMenu(type_id: number, typeMenuDto: ITypeMenuUpdate) {

        return await this.typeMenuRepository.updateTypeMenu(type_id, typeMenuDto);
    }

    async removeTypeMenu(type_id: number) {

        return await this.typeMenuRepository.removeTypeMenu(type_id);
    }
}