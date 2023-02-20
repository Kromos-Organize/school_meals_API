import {Injectable, UnauthorizedException} from "@nestjs/common";
import {LoginDto, UserDto} from "../dto/auth.dto";
import * as bcrypt from "bcryptjs";
import {AdminService} from "./admin.service";
import {ManagerService} from "./manager.service";
import {EmployeeService} from "./employee.service";

@Injectable()
export class ValidateUserService {

    constructor(private adminService: AdminService,
                private managerService: ManagerService,
                private employeeService: EmployeeService) {
    }

    async validateUser(userDto: LoginDto) {

        const user = await this.checkUser(userDto.email);

        if (user) {

            const passwordEq = await bcrypt.compare(userDto.password, user.password);

            if (userDto && passwordEq) {

                const {password, ...result} = user;

                return result;
            }
        }

        throw new UnauthorizedException({message: 'Некорректный емейл или пароль.'})
    }

    async validateByEmail(email: string) {

        const {password, ...result} = await this.checkUser(email);

        return result
    }

    async checkUser(email: string): Promise<UserDto> {

        const admin = await this.adminService.searchByEmail(email);
        const manager = await this.managerService.searchByEmail(email);
        const employee = await this.employeeService.searchByEmail(email);

        if (admin) return {id: admin.admin_id, role_id: admin.role_id, email: admin.email, password: admin.password};
        if (manager) return {
            id: manager.manager_id,
            role_id: manager.role_id,
            email: manager.email,
            password: manager.password
        };
        if (employee) return {
            id: employee.employee_id,
            role_id: employee.role_id,
            email: employee.email,
            password: employee.password
        };
    }
}