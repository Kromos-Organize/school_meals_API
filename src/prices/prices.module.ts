import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {Prices} from "./domain/entity/prices.model";
import {PricesQueryRepository} from "./infrastructure/prices.query.repository";
import {PricesRepository} from "./infrastructure/prices.repository";
import {PricesService} from "./application/prices.service";

@Module({
    providers: [
        PricesQueryRepository,
        PricesRepository,
        PricesService,
    ],
    controllers: [],
    imports: [
        SequelizeModule.forFeature([Prices])
    ],
    exports: []
})
export class PricesModule {}