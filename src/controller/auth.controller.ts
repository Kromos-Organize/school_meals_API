import {Body, Controller, Post, UsePipes} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateEmployeeDto} from "../dto/create-employee.dto";
import {AuthService} from "../service/auth.service";
import {LoginDto, Token} from "../dto/auth.dto";
import {ValidationBody} from "../validate/valdationBody.pipe";

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @ApiOperation({summary: 'Логинизация'})
    @ApiResponse({status: 200, type: Token})
    @UsePipes(ValidationBody)
    @Post('/login')
    login(@Body() userDto: LoginDto) {

        return this.authService.login(userDto)
    }

    @ApiOperation({summary: 'Регистрация'})
    @ApiResponse({status: 200, type: Token})
    @UsePipes(ValidationBody)
    @Post('/registration')
    registration(@Body() employeeDto: CreateEmployeeDto) {

        return this.authService.registration(employeeDto)
    }
}
