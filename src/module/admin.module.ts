import {forwardRef, Module} from '@nestjs/common';
import {AdminService} from '../service/admin.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Admin} from "../model/admin.model";
import {AdminController} from "../controller/admin.controller";
import {AuthAdminModule} from "./auth-admin.module";

@Module({
    providers: [AdminService],
    controllers: [AdminController],
    imports: [
        SequelizeModule.forFeature([Admin]),
        forwardRef(() => AuthAdminModule),
    ],
    exports: [
        AdminService
    ]
})
export class AdminModule { }
