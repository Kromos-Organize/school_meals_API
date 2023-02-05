import {forwardRef, Module} from '@nestjs/common';
import { AuthAdminService } from '../service/auth-admin.service';
import { AuthAdminController } from '../controller/auth-admin.controller';
import {TelegramBotModule} from "./telegram_bot.module";
import {JwtModule} from "@nestjs/jwt";
import {AdminModule} from "./admin.module";

@Module({
  providers: [AuthAdminService],
  controllers: [AuthAdminController],
  imports:[
      forwardRef(() => TelegramBotModule),
      forwardRef(() => AdminModule),
      JwtModule.register({
          secret: process.env.PRIVATE_KEY || 'SECRET',
          signOptions:{
              expiresIn: '24h'
          }//время жизни токена
      })
  ],
    exports: [
        AuthAdminService,
        JwtModule
    ]
})
export class AuthAdminModule {}
