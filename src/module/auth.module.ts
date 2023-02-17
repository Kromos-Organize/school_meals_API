import {Module} from '@nestjs/common';
import {AuthController} from '../controller/auth.controller';
import {AuthService} from '../service/auth.service';
import {EmployeeModule} from "./employee.module";
import {JwtModule} from "@nestjs/jwt";
import {TelegramBotModule} from "./telegram_bot.module";
import {AdminModule} from "./admin.module";
import {ManagerModule} from "./manager.module";
import {PassportModule} from '@nestjs/passport';
import {JwtStrategy} from "../strategy/jwt.strategy";
import {JwtTokenService} from "../service/jwtToken.service";
import {ValidateUserService} from "../service/validateUser.service";

const jwtFactory = {
    useFactory: async () => ({
        secret: process.env.PRIVATE_KEY || 'SECRET',
        signOptions: {
            expiresIn: '24h'
        }
    })
}

@Module({
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, JwtTokenService, ValidateUserService],
    imports: [
        EmployeeModule,
        TelegramBotModule,
        AdminModule,
        ManagerModule,
        JwtModule.registerAsync(jwtFactory),
        PassportModule.register({defaultStrategy: 'jwt'})
    ],
    exports: [
        AuthService,
        JwtModule,
        JwtStrategy,
        PassportModule,
        EmployeeModule,
        AdminModule,
        ManagerModule,
    ]
})
export class AuthModule {
}
