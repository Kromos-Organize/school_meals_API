import {InjectModel} from "@nestjs/sequelize";
import {CalcSchoolSum} from "../../domain/entity/calcSchoolSum.model";
import {ICreateCalcSchoolSum} from "../../domain/dto/calcSchoolSum-service.dto";

export class CalcSchoolSumRepository {

    constructor(@InjectModel(CalcSchoolSum) private calcSchoolSumRepository: typeof CalcSchoolSum) { }

    async create(calcSchoolSumDto: ICreateCalcSchoolSum) {

        return this.calcSchoolSumRepository.create(calcSchoolSumDto);
    }

    async remove(css_id: number) {

        const result = await this.calcSchoolSumRepository.destroy({ where: { css_id } });

        return result && { css_id }
    }
}