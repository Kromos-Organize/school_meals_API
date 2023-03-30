import {Module} from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {TypeMenu} from "./domain/entity/type-menu.model";
import {TypeMenuQueryRepository} from "./infrastructure/typeMenu.query.repository";
import {TypeMenuRepository} from "./infrastructure/typeMenu.repository";

import {BadCheckEntitiesException} from "../helpers/exception/BadCheckEntitiesException";
import {AuthModule} from "../auth/auth.module";
import {TypeMenuService} from "./application/typeMenu.service";
import {SchoolModule} from "../school/school.module";
import {TypeMenuController} from "./api/typeMenu.controller";

@Module({
    providers: [
        TypeMenuService,
        TypeMenuQueryRepository,
        TypeMenuRepository,
        BadCheckEntitiesException
    ],
    controllers: [TypeMenuController],
    imports: [
        SequelizeModule.forFeature([TypeMenu]),
        SchoolModule,
        AuthModule
    ],
    exports: [
        TypeMenuService,
        TypeMenuQueryRepository
    ]
})
export class TypeMenuModule { }
