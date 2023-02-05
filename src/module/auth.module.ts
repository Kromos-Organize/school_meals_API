import {forwardRef, Module} from '@nestjs/common';
import {AuthController} from '../controller/auth.controller';
import {AuthService} from '../service/auth.service';
import {EmployeeModule} from "./employee.module";
import {JwtModule} from "@nestjs/jwt";
import {TelegramBotModule} from "./telegram_bot.module";

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [
        forwardRef(() => EmployeeModule),
        TelegramBotModule,
        JwtModule.register({
            secret: process.env.PRIVATE_KEY || 'SECRET',
            signOptions:{
                expiresIn: '24h'
            }//время жизни токена
        })
    ],
    exports: [
        AuthService,
        JwtModule
    ]
})
export class AuthModule { }
