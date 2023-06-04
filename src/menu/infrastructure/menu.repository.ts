import {InjectModel} from "@nestjs/sequelize";
import {Injectable} from "@nestjs/common";
import {Menu} from "../domain/entity/menu.model";
import {IMenuCreateAttr, IMenuUpdate} from "../domain/dto/menu-service.dto";

@Injectable()
export class MenuRepository {

    constructor(
        @InjectModel(Menu) private studentRepository: typeof Menu,
    ) { }

    async createMenu(menuDto: IMenuCreateAttr) {

        return await this.studentRepository.create(menuDto);
    }

    async updateMenu(menu_id: number, menuDto:IMenuUpdate) {

        const menuInstance = await this.studentRepository.findOne({ where: { menu_id }});

        if (!menuInstance) return false;

        await menuInstance.update(menuDto);

        return await menuInstance.save();
    }

    async removeMenu(menu_id: number) {

        const result = await this.studentRepository.destroy({ where: { menu_id }});

        return result && { menu_id };
    }
}