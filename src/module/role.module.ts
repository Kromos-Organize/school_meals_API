import {forwardRef, Module} from '@nestjs/common';
import {RoleService} from '../service/role.service';
import {RoleController} from '../controller/role.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Role} from "../model/role.model";
import {AuthModule} from "./auth.module";

@Module({
    providers: [RoleService],
    controllers: [RoleController],
    imports: [
        SequelizeModule.forFeature([Role]),
        forwardRef(() => AuthModule)
    ],
    exports:[RoleService]
})
export class RoleModule { }
