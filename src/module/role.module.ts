import {Module} from '@nestjs/common';
import {RoleService} from '../service/role.service';
import {RoleController} from '../controller/role.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Role} from "../model/role.model";
import {Employee} from "../model/employee.model";
import {EmployeeRoles} from "../model/employee-role.model";

@Module({
    providers: [RoleService],
    controllers: [RoleController],
    imports: [
        SequelizeModule.forFeature([Role, Employee, EmployeeRoles])
    ],
    exports:[RoleService]// эксопртирую сервис что бы можно было использовать в employeeModule там импортирую весь модуль
})
export class RoleModule { }
