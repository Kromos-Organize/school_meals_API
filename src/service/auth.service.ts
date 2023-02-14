import {BadRequestException, Injectable, UnauthorizedException} from "@nestjs/common";
import {EmployeeService} from "./employee.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import {Employee} from "../model/employee.model";
import {CreateEmployeeDto} from "../dto/create-employee.dto";
import {LoginDto} from "../dto/auth.dto";
import {AdminService} from "./admin.service";
import {Admin} from "../model/admin.model";

@Injectable()
export class AuthService {

    constructor(private employeeService: EmployeeService,
                private adminService: AdminService,
                private jwtService: JwtService) { }

    async login(userDto: LoginDto) {

        if (userDto.isAdminDev) {

            return this.generateAdminToken(await this.validateUser(userDto))
        }

        return this.generateEmployeeToken(await this.validateUser(userDto))
    }

    async registration(employeeDto: CreateEmployeeDto) {

        const candidate = await this.employeeService.getEmployeeByEmail(employeeDto.email);

        if (candidate) {

            throw new BadRequestException([
                {
                    message: 'Сотрудник существует',
                    field: 'email',
                },
            ]);
        }

        const hashPassword = await bcrypt.hash(employeeDto.password, 5);

        // await this.moderationService.create({...employeeDto, password: hashPassword});

        return { message: "Ваши данные отправлены на модерацию. Время проверки может составлять от нескольких минут до 2 часов." }
    }

    private async generateEmployeeToken(employee: Employee ){
        if (employee === null) return null;
      console.log(employee);
        const accessToken = this.jwtService.sign(
          {
              id: employee.employee_id,
              email: employee.email,
          },{
              expiresIn: '15m',
          },
        );

        const refreshToken = this.jwtService.sign(
          {
              id: employee.employee_id,
              email: employee.email,
          },{ expiresIn: '30d' },
        );

        return {
            accessToken: accessToken,
            refreshToken: refreshToken,
        };
    }

    private async generateAdminToken(admin: Admin){
      if (admin === null) return null;
        const accessToken = this.jwtService.sign(
          {
              id: admin.admin_id,
              email: admin.email,
              position: admin.position
          },{
              expiresIn: '15m',
          },
        );

        const refreshToken = this.jwtService.sign(
          {
              id: admin.admin_id,
              email: admin.email,
              position: admin.position
          },{ expiresIn: '30d' },
        );

        return {
            accessToken: accessToken,
            refreshToken: refreshToken,
        };
    }

    private async validateUser(userDto: LoginDto) {

        let user;

        if (userDto.isAdminDev) {
            user = await this.adminService.getAdminByEmail(userDto.email)
        }else {
            user = await this.employeeService.getEmployeeByEmail(userDto.email)
        }
        if (!user) return null;
        const passwordEq = await bcrypt.compare(userDto.password, user.password);

        if (userDto && passwordEq) {
            return user;
        }

        throw new UnauthorizedException({message: 'Некорректный емейл или пароль.'})
    }
}
