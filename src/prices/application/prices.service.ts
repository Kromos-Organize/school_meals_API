import {Injectable} from "@nestjs/common";
import {PricesQueryRepository} from "../infrastructure/prices.query.repository";
import {PricesRepository} from "../infrastructure/prices.repository";
import {ICreatePrices} from "../domain/dto/prices-service.dto";

@Injectable()
export class PricesService {

    constructor(
        private pricesQueryRepository: PricesQueryRepository,
        private pricesRepository: PricesRepository,
    ) { }


    async getPriceById(price_id: number) {

        return await this.pricesQueryRepository.getPriceById(price_id);
    }

    async createPrice(priceDto: ICreatePrices){

        return await this.pricesRepository.createPrice(priceDto);
    }

    async removePrice(price_id) {

        return await this.pricesRepository.removePrice(price_id);
    }
}