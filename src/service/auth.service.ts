import {BadRequestException, Injectable, UnauthorizedException} from "@nestjs/common";
import {EmployeeService} from "./employee.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import {LoginDto} from "../dto/auth.dto";
import {AdminService} from "./admin.service";
import {Admin} from "../model/admin.model";
import {CreateManagerDto} from "../dto/create-manager.dto";
import {ManagerService} from "./manager.service";
import {Manager} from "../model/manager.model";

@Injectable()
export class AuthService {

    constructor(private adminService: AdminService,
                private managerService: ManagerService,
                private employeeService: EmployeeService,
                private jwtService: JwtService) {
    }

    async login(userDto: LoginDto) {

        if (userDto.isAdminDev) {

            return this.generateAdminToken(await this.validateUser(userDto))
        }

        return this.generateEmployeeToken(await this.validateUser(userDto))
    }

    async registration(managerDto: CreateManagerDto) {

        const candidate = await this.managerService.searchByEmail(managerDto.email);

        if (candidate) {

            throw new BadRequestException({
                message: 'Менеджер существует',
                field: 'email',
            });
        }

        const hashPassword = await bcrypt.hash(managerDto.password, 5);
        return await this.managerService.createManager({...managerDto, password: hashPassword});
    }

    private async generateEmployeeToken(manager: Manager) {
        if (manager === null) return null;

        const accessToken = this.jwtService.sign(
            {
                id: manager.manager_id,
                email: manager.email,
            }, {
                expiresIn: '15m',
            },
        );

        const refreshToken = this.jwtService.sign(
            {
                id: manager.manager_id,
                email: manager.email,
            }, {expiresIn: '30d'},
        );

        return {
            accessToken: accessToken,
            refreshToken: refreshToken,
        };
    }

    private async generateAdminToken(admin: Admin) {
        if (admin === null) return null;
        const accessToken = this.jwtService.sign(
            {
                id: admin.admin_id,
                email: admin.email,
                position: admin.position
            }, {
                expiresIn: '15m',
            },
        );

        const refreshToken = this.jwtService.sign(
            {
                id: admin.admin_id,
                email: admin.email,
                position: admin.position
            }, {expiresIn: '30d'},
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
        } else {
            user = await this.managerService.getByEmail(userDto.email)
        }
        if (!user) return null;
        const passwordEq = await bcrypt.compare(userDto.password, user.password);

        if (userDto && passwordEq) {
            return user;
        }

        throw new UnauthorizedException({message: 'Некорректный емейл или пароль.'})
    }
}
