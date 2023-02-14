import {Employee} from "../model/employee.model";
import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {CreateEmployeeDto} from "../dto/create-employee.dto";

@Injectable()
export class EmployeeService {

    constructor(@InjectModel(Employee) private employeeRepository: typeof Employee) { }

    async getAllEmployee(school_id: string) {

        return await this.employeeRepository.findAll({where: {school_id}});
    }

    async getEmployeeByEmail(email: string) {

        return await this.employeeRepository.findOne({where:{email}});
    }

    async getEmployeeById(employee_id: string) {

        return await this.employeeRepository.findOne({where:{ employee_id }, include: {all: true}});
    }

    async createEmployee(dto: CreateEmployeeDto) {

        const candidate = await this.getEmployeeByEmail(dto.email);

        if (candidate) {

            throw new HttpException('Такой сотрудник существует', HttpStatus.BAD_REQUEST)
        }

        return await this.employeeRepository.create(dto);
    }

    async updateEmployee(employee_id: string, dto: CreateEmployeeDto) {

        const employee = await this.getEmployeeById(employee_id);

        if (!employee) {

            throw new HttpException('Сотрудник не найден.', HttpStatus.NOT_FOUND)
        }

        return await employee.update(dto);
    }

    async removeEmployee(employee_id: string) {

        const result = await this.employeeRepository.destroy({where: {employee_id}})

        return result ? {message: "Сотрудник удален"} : {message: "Сотрудник не найден."}
    }
}
