import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {EmployeeService} from "./employee.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import {Employee} from "../model/employee.model";
import {TelegramBotService} from "./telegram_bot.service";
import {CreateEmployeeDto} from "../dto/create-employee.dto";

@Injectable()
export class AuthService {

    constructor(private employeeService: EmployeeService,
                private jwtService: JwtService,
                private bot: TelegramBotService) { }

    async login(employeeDto: CreateEmployeeDto) {

        const employee = await this.validateEmployee(employeeDto);

        return this.generateToken(employee)
    }

    async registration(employeeDto: CreateEmployeeDto) {

        await this.bot.sendMessageTeamLead('Попытка создания сотрудника ADMIN' + employeeDto.email);

        const candidate = await this.employeeService.getEmployeeByEmail(employeeDto.email);

        if (candidate) {
            throw new HttpException('Соруник существует',HttpStatus.BAD_REQUEST);// 400 status
        }

        const hashPassword = await bcrypt.hash(employeeDto.password, 5); // 5 = какая-то соль, посмотреть доку по bcrypt

        const employee = await this.employeeService.createEmployee({...employeeDto, password: hashPassword});

        return this.generateToken(employee);
    }

    private async generateToken(employee: Employee){

        const payload = {
            id: employee.employee_id,
            email: employee.email,
            role: employee.role,
        }

        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateEmployee(employeeDto: CreateEmployeeDto) {

        const employee = await this.employeeService.getEmployeeByEmail(employeeDto.email);
        const passwordEq = await bcrypt.compare(employeeDto.password, employee.password);

        if (employeeDto && passwordEq) {
             return employee;
        }
        throw new UnauthorizedException({message: 'Некорректный емейл или пароль.'})
    }
}
