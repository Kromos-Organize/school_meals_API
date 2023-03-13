import {Module} from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {Menu} from "./domain/entity/menu.model";
import {TypeMenu} from "./domain/entity/type-menu.model";

@Module({
    providers: [

    ],
    controllers: [],
    imports: [
        SequelizeModule.forFeature([Menu, TypeMenu]),
    ],
    exports: [

    ]
})
export class MenuModule { }
