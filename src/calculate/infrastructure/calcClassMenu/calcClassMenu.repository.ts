import {InjectModel} from "@nestjs/sequelize";
import {CalcClassMenu} from "../../domain/entity/calcClassMenu.model";
import {ICreateCalcClassMenu} from "../../domain/dto/calcClassMenu-service.dto";


export class CalcClassMenuRepository {

    constructor(@InjectModel(CalcClassMenu) private calcClassMenuRepository: typeof CalcClassMenu) { }

    async create(calcClassMenuDto: ICreateCalcClassMenu) {

        return this.calcClassMenuRepository.create(calcClassMenuDto);
    }

    async remove(ccm_id: number) {

        const result = await this.calcClassMenuRepository.destroy({ where: { ccm_id } });

        return result && { ccm_id }
    }
}