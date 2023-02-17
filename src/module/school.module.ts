import {forwardRef, Module} from '@nestjs/common';
import {SchoolService} from '../service/school.service';
import {SchoolController} from '../controller/school.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {School} from "../model/school.model";
import {AuthModule} from "./auth.module";

@Module({
    providers: [SchoolService],
    controllers: [SchoolController],
    imports: [
        SequelizeModule.forFeature([School]),
        forwardRef(() => AuthModule)
    ],
    exports: [
        SchoolService
    ]
})
export class SchoolModule {
}
