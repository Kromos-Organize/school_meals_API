import {InjectModel} from "@nestjs/sequelize";
import {CalcClassSum} from "../../domain/entity/calcClassSum.model";
import {ISearchParamCCS} from "../../domain/dto/calcClassSum-service.dto";

export class CalcClassSumQueryRepository {

    @InjectModel(CalcClassSum) private calcClassSumRepository: typeof CalcClassSum;

    async getById(ccs_id: number) {

        return await this.calcClassSumRepository.findOne({ where: { ccs_id }});
    }

    async getByParam(param: ISearchParamCCS) {

        return await this.calcClassSumRepository.findOne({ where: { ...param }});
    }
}