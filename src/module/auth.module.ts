import {forwardRef, Module} from '@nestjs/common';
import {AuthController} from '../controller/auth.controller';
import {AuthService} from '../service/auth.service';
import {EmployeeModule} from "./employee.module";
import {JwtModule} from "@nestjs/jwt";
import {TelegramBotModule} from "./telegram_bot.module";
import {AdminModule} from "./admin.module";

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [
        forwardRef(() => EmployeeModule),
        TelegramBotModule,
        AdminModule,
        JwtModule.register({
            secret: process.env.PRIVATE_KEY || 'SECRET',
            signOptions: {
                expiresIn: '24h'
            }
        }),
    ],
    exports: [
        AuthService,
        JwtModule
    ]
})
export class AuthModule { }
