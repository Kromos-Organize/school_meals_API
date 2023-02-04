import { Module } from '@nestjs/common';
import { AuthAdminService } from './auth-admin.service';
import { AuthAdminController } from './auth-admin.controller';
import {AdminModule} from "../admin/admin.module";
import {TelegramBotModule} from "../telegram_bot/telegram_bot.module";
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
