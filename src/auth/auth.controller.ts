import {Body, Controller, Post} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateEmployeeDto} from "../employee/dto/create-employee.dto";
import {AuthService} from "./auth.service";
import {Token} from "./dto/auth.dto";

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @ApiOperation({summary: 'Логинизация'})
    @ApiResponse({status: 200, type: Token})
    @Post('/login')
    login(@Body() employeeDto: CreateEmployeeDto) {

        return this.authService.login(employeeDto)
    }

    @ApiOperation({summary: 'Регистрация'})
    @ApiResponse({status: 200, type: Token})
    @Post('/registration')
    registration(@Body() employeeDto: CreateEmployeeDto) {

        return this.authService.registration(employeeDto)
    }
}
