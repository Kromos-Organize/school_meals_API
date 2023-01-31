
import {Employee} from "./employee.model";
import {Injectable} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import {CreateEmployeeDto} from "./dto/create-employee.dto";
import {RoleService} from "../role/role.service";

@Injectable()
export class EmployeeService {

    //добавляем модель для использования
    constructor(@InjectModel(Employee) private employeeRepository: typeof Employee,
                private roleService: RoleService) { }

    async createEmployee(dto: CreateEmployeeDto) {

        const employee = await this.employeeRepository.create(dto);
        const role = await this.roleService.getRoleByValue("EMPLOYEE")

        await employee.$set('roles',[role.role_id])// метод $set перезаписывает поле таблицы, если его нет то добавляет такой столбец

        return employee;
    }

    async getAllEmployee() {

        return await this.employeeRepository.findAll({include: {all:true}});// все поля с которым связан пользователь будут подтягиваться
    }
}
