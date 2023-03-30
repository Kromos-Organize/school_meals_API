import {MiddlewareConsumer, Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {ConfigModule, ConfigService} from "@nestjs/config";
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
import {ThrottlerGuard, ThrottlerModule} from "@nestjs/throttler";
import {APP_GUARD} from "@nestjs/core";
import {MenuModule} from "./menu/menu.module";
import {TypeMenuModule} from "./typeMenu/typeMenu.module";
import {PricesModule} from "./prices/prices.module";
import {LogsModule} from "./logs/logs.module";
import {MealsModule} from "./meals/meals.module";
import {ScheduleModule} from "@nestjs/schedule";
import {CronTasksService} from "./helpers/scheduler/cron-tasks.service";
import { AppGateway } from './gateway/app.gateway';
import {BlockCabinetModule} from "./block_cabinet/blockCabinet.module";

@Module({
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    },
    CronTasksService,
    AppGateway
  ],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ttl: config.get('THROTTLE_TTL'),
        limit: config.get('THROTTLE_LIMIT'),
      }),
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
      synchronize: true,
      logging: false
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    AdminModule,
    UserModule,
    SchoolModule,
    StudentModule,
    ClassModule,
    TelegramBotModule,
    MenuModule,
    TypeMenuModule,
    PricesModule,
    LogsModule,
    MealsModule,
    BlockCabinetModule,
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
