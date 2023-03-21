import {forwardRef, Module} from '@nestjs/common';
import {SchoolService} from './application/school.service';
import {SchoolController} from './api/school.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {School} from "./domain/entities/school.model";
import {AuthModule} from "../auth/auth.module";
import {UserModule} from "../users/userModule";
import {BadCheckEntitiesException} from "../helpers/exception/BadCheckEntitiesException";
import {SchoolRepository} from "./infrastructure/school.repository";
import {SchoolQueryRepository} from "./infrastructure/school.query.repository";
import {AdminModule} from "../admin/admin.module";
import {Admin} from "../admin/domain/entities/admin.model";

@Module({
    providers: [
        SchoolRepository,
        SchoolQueryRepository,
        SchoolService,
        BadCheckEntitiesException
    ],
    controllers: [SchoolController],
    imports: [
        SequelizeModule.forFeature([School, Admin]),
        forwardRef(() => AuthModule),
        AdminModule,
        UserModule,
    ],
    exports: [
        SchoolService
    ]
})
export class SchoolModule {
}
