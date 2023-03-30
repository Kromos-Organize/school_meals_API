import { forwardRef, Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./domain/entities/user.model";
import { UsersService } from "./application/users.service";
import { UsersController } from "./api/users.controller";
import { AuthModule } from "../auth/auth.module";
import { UsersRepository } from "./infrastructure/users.repository";
import { UsersQueryRepository } from "./infrastructure/users.query.repository";
import { PasswordService } from "../helpers/password/password.service";
import {BadCheckEntitiesException} from "../helpers/exception/BadCheckEntitiesException";
import {BlockCabinetModule} from "../block_cabinet/blockCabinet.module";

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,
    UsersQueryRepository,
    PasswordService,
    BadCheckEntitiesException
  ],
  imports: [
    SequelizeModule.forFeature([User]),
    forwardRef(() => AuthModule),
    forwardRef(() => BlockCabinetModule),
  ],
  exports: [
    UsersService,
    UsersRepository,
    UsersQueryRepository,
    PasswordService,
  ],
})
export class UserModule {}
