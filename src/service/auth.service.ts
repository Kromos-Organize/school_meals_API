import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {EmployeeService} from "./employee.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import {Employee} from "../model/employee.model";
import {TelegramBotService} from "./telegram_bot.service";
import {CreateEmployeeDto} from "../dto/create-employee.dto";
import {LoginDto} from "../dto/auth.dto";
import {AdminService} from "./admin.service";
import {Admin} from "../model/admin.model";

@Injectable()
export class AuthService {

    constructor(private employeeService: EmployeeService,
                private adminService: AdminService,
                private jwtService: JwtService,
                private bot: TelegramBotService) { }

    async login(userDto: LoginDto) {

        if (userDto.isAdminDev) {

            return this.generateAdminToken(await this.validateUser(userDto))
        }

        return this.generateEmployeeToken(await this.validateUser(userDto))
    }

    async registration(employeeDto: CreateEmployeeDto) {

        // await this.bot.sendMessageTeamLead('Попытка создания сотрудника ADMIN' + employeeDto.email);

        const candidate = await this.employeeService.getEmployeeByEmail(employeeDto.email);

        if (candidate) {
            throw new HttpException('Соруник существует',HttpStatus.BAD_REQUEST);// 400 status
        }

        const hashPassword = await bcrypt.hash(employeeDto.password, 5);

        const employee = await this.employeeService.createEmployee({...employeeDto, password: hashPassword});

        return this.generateEmployeeToken(employee);
    }

    private async generateEmployeeToken(employee: Employee ){

        return {
            token: this.jwtService.sign({
                id: employee.employee_id,
                email: employee.email,
                role: employee.role,
            })
        }
    }

    private async generateAdminToken(admin: Admin){

        return {
            token: this.jwtService.sign({
                id: admin.admin_id,
                email: admin.email,
                position: admin.position
            })
        }
    }

    private async validateUser(userDto: LoginDto) {

        let user;

        if (userDto.isAdminDev) {
            user = await this.adminService.getAdminByEmail(userDto.email)
        }else {
            user = await this.employeeService.getEmployeeByEmail(userDto.email)
        }

        const passwordEq = await bcrypt.compare(userDto.password, user.password);

        if (userDto && passwordEq) {
            return user;
        }

        throw new UnauthorizedException({message: 'Некорректный емейл или пароль.'})
    }
}
