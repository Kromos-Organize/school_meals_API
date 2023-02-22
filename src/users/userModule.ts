import { forwardRef, Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./domain/entities/user.model";
import { UsersService } from "./application/users.service";
import { UsersController } from "./api/usersController";
import { AuthModule } from "../auth/auth.module";
import { UsersRepository } from "./infrastructure/users.repository";
import { UsersQueryRepository } from "./infrastructure/users.query.repository";
import { PasswordService } from "../helpers/password/password.service";

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,
    UsersQueryRepository,
    PasswordService,
  ],
  imports: [
    SequelizeModule.forFeature([User]),
    forwardRef(() => AuthModule),
  ],
  exports: [
    UsersService,
    UsersRepository,
    UsersQueryRepository,
    PasswordService,
  ],
})
export class UserModule {}
