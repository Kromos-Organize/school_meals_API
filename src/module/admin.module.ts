import {Module} from '@nestjs/common';
import {AdminService} from '../service/admin.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Admin} from "../model/admin.model";
import {AdminController} from "../controller/admin.controller";
import {Role} from "../model/role.model";
import {RoleModule} from "./role.module";

@Module({
    providers: [AdminService],
    controllers: [AdminController],
    imports: [
        SequelizeModule.forFeature([Admin, Role]),
        RoleModule
    ],
    exports: [
        AdminService
    ]
})
export class AdminModule { }
