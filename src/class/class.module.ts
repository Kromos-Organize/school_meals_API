import {forwardRef, Module} from "@nestjs/common";
import {ClassService} from "./application/class.service";
import {ClassController} from "./api/class.controller";
import {SequelizeModule} from "@nestjs/sequelize";
import {SchoolModule} from "../school/school.module";
import {AuthModule} from "../auth/auth.module";
import {BadCheckEntitiesException} from "../helpers/exception/BadCheckEntitiesException";
import {ClassQueryRepository} from "./infrastructure/class.query.repository";
import {ClassRepository} from "./infrastructure/class.repository";
import {Class} from "./domain/entity/class.model";
import {BlockCabinetModule} from "../block_cabinet/blockCabinet.module";
import {UserModule} from "../users/user.module";

@Module({
    providers: [
        ClassQueryRepository,
        ClassRepository,
        ClassService,
        BadCheckEntitiesException
    ],
    controllers: [ClassController],
    imports: [
        SequelizeModule.forFeature([Class]),
        SchoolModule,
        forwardRef(() => AuthModule),
        BlockCabinetModule,
        UserModule,
    ],
    exports: [
        ClassService
    ]
})
export class ClassModule {}