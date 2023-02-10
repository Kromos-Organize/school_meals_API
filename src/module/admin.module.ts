import {Module} from '@nestjs/common';
import {AdminService} from '../service/admin.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Admin} from "../model/admin.model";
import {AdminController} from "../controller/admin.controller";
import { ModerationModule } from './moderation.module';

@Module({
    providers: [AdminService],
    controllers: [AdminController],
    imports: [
        SequelizeModule.forFeature([Admin]),
        ModerationModule,
    ],
    exports: [
        AdminService
    ]
})
export class AdminModule { }
