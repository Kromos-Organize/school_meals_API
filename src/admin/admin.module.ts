import {forwardRef, Module} from '@nestjs/common';
import {AdminService} from './application/admin.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Admin} from "./domain/entities/admin.model";
import {AdminController} from "./api/admin.controller";
import {Role} from "../role/domain/entities/role.model";
import {RoleModule} from "../role/role.module";
import {AuthModule} from "../auth/auth.module";

@Module({
    providers: [AdminService],
    controllers: [AdminController],
    imports: [
        SequelizeModule.forFeature([Admin, Role]),
        RoleModule,
        forwardRef(() => AuthModule),
    ],
    exports: [
        AdminService
    ]
})
export class AdminModule { }
