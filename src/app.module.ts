import {MiddlewareConsumer, Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {EmployeeModule} from './module/employee.module';
import {ConfigModule} from "@nestjs/config";
import {AuthModule} from './module/auth.module';
import {SchoolModule} from './module/school.module';
import {StudentModule} from './module/student.module';
import {AdminModule} from './module/admin.module';
import {LoggerMiddleware} from "./middleware/logger.middleware";
import {ClassModule} from "./module/class.module";
import {allModels} from "./importModels";
import {ManagerModule} from "./module/manager.module";
import {TelegramBotService} from "./service/telegram_bot.service";
import {TelegramBotModule} from "./module/telegram_bot.module";
import {RoleModule} from "./module/role.module";

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB_NAME,
            models: allModels,
            autoLoadModels: true
        }),
        AuthModule,
        AdminModule,
        EmployeeModule,
        ManagerModule,
        SchoolModule,
        StudentModule,
        ClassModule,
        RoleModule,
        TelegramBotModule,
    ]
})
export class AppModule {

    constructor(private bot: TelegramBotService) {

        bot.connectBot();
    }

    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}