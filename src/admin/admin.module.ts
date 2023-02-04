import {Module} from '@nestjs/common';
import {AdminService} from './admin.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Admin} from "./admin.model";
import {AdminController} from "./admin.controller";

@Module({
    providers: [AdminService],
    controllers: [AdminController],
    imports: [
        SequelizeModule.forFeature([Admin]),
    ],
    exports: [
        AdminService
    ]
})
export class AdminModule { }
