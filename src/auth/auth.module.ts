import {Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {EmployeeModule} from "../employee/employee.module";
import {JwtModule} from "@nestjs/jwt";
import {TelegramBotModule} from "../telegram_bot/telegram_bot.module";

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [
        EmployeeModule,
        TelegramBotModule,
        JwtModule.register({
            secret: process.env.PRIVATE_KEY || 'SECRET',
            signOptions:{
                expiresIn: '10m'
            }//время жизни токена
        })
    ]
})
export class AuthModule { }
