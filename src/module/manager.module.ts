import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {Manager} from "../model/manager.model";
import {ManagerService} from "../service/manager.service";
import {ManagerController} from "../controller/manager.controller";

@Module({
    controllers: [ManagerController],
    providers: [ManagerService],
    imports: [
        SequelizeModule.forFeature([Manager]),
    ],
    exports: [
        ManagerService
    ]
})
export class ManagerModule { }