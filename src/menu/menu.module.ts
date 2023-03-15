import {Module} from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {Menu} from "./domain/entity/menu.model";
import {TypeMenu} from "../typeMenu/domain/entity/type-menu.model";
import {MenuQueryRepository} from "./infrastructure/menu.query.repository";
import {MenuRepository} from "./infrastructure/menu.repository";
import {TypeMenuQueryRepository} from "../typeMenu/infrastructure/typeMenu.query.repository";
import {TypeMenuRepository} from "../typeMenu/infrastructure/typeMenu.repository";
import {MenuService} from "./application/menu.service";
import {SchoolModule} from "../school/school.module";
import {BadCheckEntitiesException} from "../helpers/exception/BadCheckEntitiesException";
import {MenuController} from "./api/menu.controller";
import {AuthModule} from "../auth/auth.module";
import {TypeMenuModule} from "../typeMenu/typeMenu.module";

@Module({
    providers: [
        MenuService,
        MenuQueryRepository,
        MenuRepository,
        TypeMenuQueryRepository,
        TypeMenuRepository,
        BadCheckEntitiesException
    ],
    controllers: [MenuController],
    imports: [
        SequelizeModule.forFeature([Menu, TypeMenu]),
        SchoolModule,
        AuthModule,
        TypeMenuModule,
    ],
    exports: [
        MenuService
    ]
})
export class MenuModule { }
