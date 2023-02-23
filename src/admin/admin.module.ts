import {forwardRef, Module} from '@nestjs/common';
import {AdminService} from './application/admin.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Admin} from "./domain/entities/admin.model";
import {AdminController} from "./api/admin.controller";
import {AuthModule} from "../auth/auth.module";
import {PasswordService} from "../helpers/password/password.service";
import {BadCheckEntitiesException} from "../helpers/exception/BadCheckEntitiesException";
import {AdminRepository} from "./infrastructure/admin.repository";
import {AdminQueryRepository} from "./infrastructure/admin.query.repository";

@Module({
    controllers: [AdminController],
    providers: [
        AdminService,
        AdminRepository,
        AdminQueryRepository,
        PasswordService,
        BadCheckEntitiesException],
    imports: [
        SequelizeModule.forFeature([Admin]),
        forwardRef(() => AuthModule),
    ],
    exports: [
        AdminService,
        AdminQueryRepository
    ]
})
export class AdminModule { }
