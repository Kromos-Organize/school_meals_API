import {Injectable, Scope} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Prices} from "../domain/entity/prices.model";

@Injectable({ scope: Scope.DEFAULT })
export class PricesQueryRepository {

    @InjectModel(Prices) private pricesRepository: typeof Prices;

    async getPriceById(price_id: number) {

        return await this.pricesRepository.findOne({ where: { price_id }});
    }
}