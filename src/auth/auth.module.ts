import {forwardRef, Module} from "@nestjs/common";
import {AuthController} from "./api/auth.controller";
import {AuthService} from "./application/auth.service";
import {JwtModule} from "@nestjs/jwt";
import {TelegramBotModule} from "../helpers/bot/telegram_bot.module";
import {AdminModule} from "../admin/admin.module";
import {UserModule} from "../users/userModule";
import {PassportModule} from "@nestjs/passport";
import {JwtStrategy} from "./strategy/jwt.strategy";
import {ValidateUserService} from "../helpers/middleware/validateUser.service";
import {JwtService} from "./application/jwt-service";
import {BadCheckEntitiesException} from "../helpers/exception/BadCheckEntitiesException";
import {SequelizeModule} from "@nestjs/sequelize";
import {Session} from "../session/domain/entities/session.model";
import {SessionService} from "../session/application/SessionService";
import {SessionRepository} from "../session/infrastructure/session.repository";
import {EmailService} from "../email-adapter/email-service";
import {PasswordService} from "../helpers/password/password.service";

const jwtFactory = {
    useFactory: async () => ({
        secret: process.env.PRIVATE_KEY || "SECRET",
        signOptions: {
            expiresIn: "24h",
        },
    }),
};

@Module({
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, JwtService, ValidateUserService, BadCheckEntitiesException,
        SessionService, SessionRepository, EmailService, PasswordService],
    imports: [
        SequelizeModule.forFeature([Session]),
        forwardRef(() => UserModule),
        forwardRef(() => AdminModule),
        TelegramBotModule,
        JwtModule.registerAsync(jwtFactory),
        PassportModule.register({defaultStrategy: "jwt"}),
    ],
    exports: [JwtModule, JwtService, JwtStrategy, PassportModule],
})
export class AuthModule {
}
