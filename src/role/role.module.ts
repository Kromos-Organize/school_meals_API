import {forwardRef, Module} from '@nestjs/common';
import {RoleService} from './application/role.service';
import {RoleController} from './api/role.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Role} from "./domain/entities/role.model";
import {AuthModule} from "../auth/auth.module";

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
