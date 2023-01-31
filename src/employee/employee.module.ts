import {Module} from '@nestjs/common';
import {EmployeeController} from './employee.controller';
import {EmployeeService} from './employee.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Employee} from "./employee.model";
import {Role} from "../role/role.model";
import {EmployeeRoles} from "../role/employee-role.model";
import {RoleModule} from "../role/role.module";

@Module({
    controllers: [EmployeeController],
    providers: [EmployeeService],
    imports: [
        SequelizeModule.forFeature([Employee, Role, EmployeeRoles]),//импорты моделей бд
        RoleModule
    ]
})
export class EmployeeModule {
}
