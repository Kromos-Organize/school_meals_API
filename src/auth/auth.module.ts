import {Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {EmployeeModule} from "../employee/employee.module";
import {JwtModule} from "@nestjs/jwt";

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [
        EmployeeModule,
        JwtModule.register({
            secret: process.env.PRIVATE_KEY || 'SECRET',
            signOptions:{
                expiresIn: '10m'
            }//время жизни токена
        })
    ]
})
export class AuthModule { }
