import {InjectModel} from "@nestjs/sequelize";
import {ICreateCalcClassSum} from "../../domain/dto/calcClassSum-service.dto";
import {CalcClassSum} from "../../domain/entity/calcClassSum.model";


export class CalcClassSumRepository {

    constructor(@InjectModel(CalcClassSum) private calcClassSumRepository: typeof CalcClassSum) { }

    async create(calcClassSumDto: ICreateCalcClassSum) {

        return this.calcClassSumRepository.create(calcClassSumDto);
    }

    async remove(ccs_id: number) {

        const result = await this.calcClassSumRepository.destroy({ where: { ccs_id } });

        return result && { ccs_id }
    }
}