import {Module} from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {Menu} from "./domain/entity/menu.model";
import {TypeMenu} from "./domain/entity/type-menu.model";
import {MenuQueryRepository} from "./infrastructure/menu.query.repository";
import {MenuRepository} from "./infrastructure/menu.repository";
import {TypeMenuQueryRepository} from "./infrastructure/typeMenu.query.repository";
import {TypeMenuRepository} from "./infrastructure/typeMenu.repository";
import {MenuService} from "./application/menu.service";
import {SchoolModule} from "../school/school.module";
import {BadCheckEntitiesException} from "../helpers/exception/BadCheckEntitiesException";
import {MenuController} from "./api/menu.controller";

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
    ],
    exports: [

    ]
})
export class MenuModule { }
