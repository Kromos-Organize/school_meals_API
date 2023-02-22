import {MiddlewareConsumer, Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {ConfigModule} from "@nestjs/config";
import {AuthModule} from "./auth/auth.module";
import {SchoolModule} from "./school/school.module";
import {StudentModule} from "./student/student.module";
import {AdminModule} from "./admin/admin.module";
import {LoggerMiddleware} from "./helpers/middleware/logger.middleware";
import {ClassModule} from "./class/class.module";
import {allModels} from "./importModels";
import {UserModule} from "./users/userModule";
import {TelegramBotService} from "./helpers/bot/telegram_bot.service";
import {TelegramBotModule} from "./helpers/bot/telegram_bot.module";

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB_NAME,
      models: allModels,
      autoLoadModels: true,
    }),
    AuthModule,
    AdminModule,
    UserModule,
    SchoolModule,
    StudentModule,
    ClassModule,
    TelegramBotModule,
  ],
})
export class AppModule {
  constructor(private bot: TelegramBotService) {
    bot.connectBot();
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
