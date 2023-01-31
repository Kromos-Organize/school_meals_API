import {Module} from '@nestjs/common';
import {RoleService} from './role.service';
import {RoleController} from './role.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Role} from "./role.model";
import {Employee} from "../employee/employee.model";
import {EmployeeRoles} from "./employee-role.model";

@Module({
    providers: [RoleService],
    controllers: [RoleController],
    imports: [
        SequelizeModule.forFeature([Role, Employee, EmployeeRoles])
    ],
    exports:[RoleService]// эксопртирую сервис что бы можно было использовать в employeeModule там импортирую весь модуль
})
export class RoleModule { }
