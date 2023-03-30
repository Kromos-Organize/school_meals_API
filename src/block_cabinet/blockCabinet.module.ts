import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {BlockCabinetQueryRepository} from "./infrastructure/blockCabinet.query.repository";
import {BlockCabinetRepository} from "./infrastructure/blockCabinet.repository";
import {BlockCabinetService} from "./application/blockCabinet.service";
import {SchoolModule} from "../school/school.module";
import {UserModule} from "../users/userModule";
import {BadCheckEntitiesException} from "../helpers/exception/BadCheckEntitiesException";
import {BlockCabinetController} from "./api/blockCabinet.controller";
import {BlockCabinet} from "./domain/entity/blockCabinet.model";

@Module({
    providers: [
        BlockCabinetQueryRepository,
        BlockCabinetRepository,
        BlockCabinetService,
        BadCheckEntitiesException
    ],
    controllers: [BlockCabinetController],
    imports: [
        SequelizeModule.forFeature([BlockCabinet]),
        SchoolModule,
        UserModule,

    ],
    exports: [BlockCabinetService]
})
export class BlockCabinetModule {}