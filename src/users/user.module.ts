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
import {RecoveryData} from "./domain/entities/recovery-data.model";
import {EmailService} from "../email-adapter/email-service";
import { SchoolModule } from 'src/school/school.module';
import { School } from 'src/school/domain/entities/school.model';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,
    UsersQueryRepository,
    PasswordService,
    BadCheckEntitiesException,
    EmailService,
  ],
  imports: [
    SequelizeModule.forFeature([User, RecoveryData, School]),
    forwardRef(() => AuthModule),
    forwardRef(() => BlockCabinetModule),
    SchoolModule,
  ],
  exports: [
    UsersService,
    UsersRepository,
    UsersQueryRepository,
    PasswordService,
  ],
})
export class UserModule {}
