import {forwardRef, Module} from '@nestjs/common';
import {SchoolService} from './application/school.service';
import {SchoolController} from './api/school.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {School} from "./domain/entities/school.model";
import {AuthModule} from "../auth/auth.module";
import {UserModule} from "../users/userModule";

@Module({
    providers: [SchoolService],
    controllers: [SchoolController],
    imports: [
        SequelizeModule.forFeature([School]),
        forwardRef(() => AuthModule),
        UserModule
    ],
    exports: [
        SchoolService
    ]
})
export class SchoolModule {
}
