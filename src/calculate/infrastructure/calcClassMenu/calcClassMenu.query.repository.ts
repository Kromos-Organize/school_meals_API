import {InjectModel} from "@nestjs/sequelize";
import {CalcClassMenu} from "../../domain/entity/calcClassMenu.model";
import {ISearchParamCCM} from "../../domain/dto/calcClassMenu-service.dto";

export class CalcClassMenuQueryRepository {

    @InjectModel(CalcClassMenu) private calcClassMenuRepository: typeof CalcClassMenu;

    async getById(ccm_id: number) {

        return await this.calcClassMenuRepository.findOne({ where: { ccm_id }});
    }

    async getByParam(param: ISearchParamCCM) {

        return await this.calcClassMenuRepository.findOne({ where: { ...param }});
    }
}