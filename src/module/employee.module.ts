import {forwardRef, Module} from '@nestjs/common';
import {EmployeeController} from '../controller/employee.controller';
import {EmployeeService} from '../service/employee.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Employee} from "../model/employee.model";
import {Role} from "../model/role.model";
import {EmployeeRoles} from "../model/employee-role.model";
import {RoleModule} from "./role.module";
import {AuthModule} from "./auth.module";

@Module({
    controllers: [EmployeeController],
    providers: [EmployeeService],
    imports: [
        SequelizeModule.forFeature([Employee, Role, EmployeeRoles]),//импорты моделей бд
        RoleModule,
        forwardRef(() => AuthModule),
    ],
    exports: [EmployeeService]
})
export class EmployeeModule {
}
