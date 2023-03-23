import {InjectModel} from "@nestjs/sequelize";
import {CalcSchoolSum} from "../../domain/entity/calcSchoolSum.model";
import {ISearchParamCSS} from "../../domain/dto/calcSchoolSum-service.dto";

export class CalcSchoolSumQueryRepository {

    @InjectModel(CalcSchoolSum) private calcSchoolSumRepository: typeof CalcSchoolSum;

    async getById(css_id: number) {

        return await this.calcSchoolSumRepository.findOne({ where: { css_id }});
    }

    async getByParam(param: ISearchParamCSS) {

        return await this.calcSchoolSumRepository.findOne({ where: { ...param }});
    }
}