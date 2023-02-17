import {Employee} from "../model/employee.model";
import {BadRequestException, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {CreateEmployeeDto, UpdateEmloyeeDto} from "../dto/create-employee.dto";
import {SchoolService} from "./school.service";
import {RoleService} from "./role.service";
import * as bcrypt from "bcryptjs";

@Injectable()
export class EmployeeService {

    readonly type_role;

    constructor(@InjectModel(Employee) private employeeRepository: typeof Employee,
                private roleService: RoleService,
                private schoolService: SchoolService) {

        this.type_role = 'EMPLOYEE'
    }

    async getAllEmployee(school_id: string) {

        return await this.employeeRepository.findAll({where: {school_id}});
    }

    async getEmployeeByEmail(email: string) {

        const employee = await this.searchByEmail(email);

        if (!employee) {

            throw new BadRequestException({
                message: 'Сотрудник не найден',
                query_param: 'email',
            });
        }

        return employee;
    }

    async getEmployeeById(employee_id: string) {

        const employee = await this.employeeRepository.findOne({where: {employee_id}});

        if (!employee) {

            throw new BadRequestException({
                message: 'Сотрудник не найден',
                query_param: 'employee_id',
            });
        }

        return employee;
    }

    async createEmployee(dto: CreateEmployeeDto) {

        await this.schoolService.get(dto.school_id);

        const candidate = await this.employeeRepository.findOne({where: {email: dto.email}});

        if (candidate) {

            throw new BadRequestException({
                message: 'Такой сотрудник существует',
                field: 'email',
            });
        }

        const role = await this.roleService.getRoleByValue(this.type_role);

        const hashPassword = await bcrypt.hash(dto.password, 5);

        return await this.employeeRepository.create({...dto, role_id: role.role_id, password: hashPassword});
    }

    async updateEmployee(employee_id: string, dto: UpdateEmloyeeDto) {

        const employee = await this.getEmployeeById(employee_id);

        if (!employee) {

            throw new BadRequestException({
                message: 'Сотрудник не найден.',
                field: 'school_id',
            });
        }

        return await employee.update(dto);
    }

    async removeEmployee(employee_id: string) {

        const result = await this.employeeRepository.destroy({where: {employee_id}})

        return result ? {message: "Сотрудник удален"} : {message: "Сотрудник не найден."}
    }

    async searchByEmail(email: string) {

        return await this.employeeRepository.findOne({where: {email}});
    }
}
