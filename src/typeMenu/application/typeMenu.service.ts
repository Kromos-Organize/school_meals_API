import {Injectable} from "@nestjs/common";
import {TypeMenuQueryRepository} from "../infrastructure/typeMenu.query.repository";
import {TypeMenuRepository} from "../infrastructure/typeMenu.repository";
import {ITypeMenuCreateAttr, ITypeMenuUpdate} from "../domain/dto/typeMenu-service.dto";

@Injectable()
export class TypeMenuService {

    constructor(
        private typeMenuQueryRepository: TypeMenuQueryRepository,
        private typeMenuRepository: TypeMenuRepository,
    ) { }

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