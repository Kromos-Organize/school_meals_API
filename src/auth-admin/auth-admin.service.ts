import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {AdminService} from "../admin/admin.service";
import {JwtService} from "@nestjs/jwt";
import {TelegramBotService} from "../telegram_bot/telegram_bot.service";
import {CreateAdminDto} from "../admin/dto/create-admin.dto";
import {Admin} from "../admin/admin.model";
import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthAdminService {

    constructor(private adminService: AdminService,
                private jwtService: JwtService,
                private bot: TelegramBotService) { }

    async login(adminDto: CreateAdminDto){

        const admin = await this.validateAdmin(adminDto);

        return this.generateTokenAdmin(admin)

    }

    async registration(adminDto: CreateAdminDto){

        let message = 'Запрос на создание админа\n//'+JSON.stringify(adminDto)+'//\nВведите пароль для подтверждения';

        await this.bot.sendMessageTeamLead(message)

        const candidate = await this.adminService.getAdminByEmail(adminDto.email);

        if (candidate) {

            message = 'Запрос на создание админа\n' + candidate.email + '\nтакой админ уже есть.';
            throw new HttpException('Соруник существует',HttpStatus.BAD_REQUEST);
        }else {

            message = 'Админ ' + adminDto.email+ ' создан.'
        }

        const hashPassword = await bcrypt.hash(adminDto.password, 5);
        const admin = await this.adminService.create({...adminDto,password: hashPassword});


        await this.bot.sendMessageTeamLead(message);

        return this.generateTokenAdmin(admin);
    }

    private async generateTokenAdmin(admin: Admin){

        const payload = {
            id: admin.admin_id,
            email: admin.email,
            position: admin.position,
        }

        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateAdmin(adminDto: CreateAdminDto) {

        const admin = await this.adminService.getAdminByEmail(adminDto.email);
        const passwordEq = await bcrypt.compare(adminDto.password, admin.password);

        if (adminDto && passwordEq) {
            return admin;
        }

        throw new UnauthorizedException({message: 'Некорректный емейл или пароль.'})
    }
}
