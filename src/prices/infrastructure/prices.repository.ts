import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Prices} from "../domain/entity/prices.model";
import {ICreatePrices} from "../domain/dto/prices-service.dto";

@Injectable()
export class PricesRepository {

    constructor(
        @InjectModel(Prices) private pricesRepository: typeof Prices,
    ) { }

    async createPrice(priceDto: ICreatePrices) {

        return await this.pricesRepository.create(priceDto);
    }

    async removePrice(price_id) {

        const result = await this.pricesRepository.destroy({ where: { price_id }});

        return result && { price_id };
    }
}