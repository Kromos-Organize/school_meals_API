import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {EmployeeModule} from './employee/employee.module';
import {ConfigModule} from "@nestjs/config";
import {Employee} from "./employee/employee.model";
import { RoleModule } from './role/role.module';
import {Role} from "./role/role.model";
import {EmployeeRoles} from "./role/employee-role.model";
import { AuthModule } from './auth/auth.module';


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
            models: [Employee, Role, EmployeeRoles], //модели базы данных
            autoLoadModels: true
        }),
        EmployeeModule,
        RoleModule,
        AuthModule,
    ]
})
export class AppModule { }