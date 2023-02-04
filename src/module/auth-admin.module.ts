import { Module } from '@nestjs/common';
import { AuthAdminService } from '../service/auth-admin.service';
import { AuthAdminController } from '../controller/auth-admin.controller';
import {AdminModule} from "./admin.module";
import {TelegramBotModule} from "./telegram_bot.module";
import {JwtModule} from "@nestjs/jwt";

@Module({
  providers: [AuthAdminService],
  controllers: [AuthAdminController],
  imports:[
      AdminModule,
      TelegramBotModule,
      JwtModule.register({
          secret: process.env.PRIVATE_KEY || 'SECRET',
          signOptions:{
              expiresIn: '24h'
          }//время жизни токена
      })
  ]
})
export class AuthAdminModule {}
