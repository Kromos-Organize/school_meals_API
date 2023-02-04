import {Body, Controller, Post} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Token} from "../dto/auth.dto";
import {CreateAdminDto} from "../dto/create-admin.dto";
import {AuthAdminService} from "../service/auth-admin.service";

@ApiTags('Авторизация админов проекта')
@Controller('auth-admin')
export class AuthAdminController {

    constructor(private authAdminService: AuthAdminService) { }

    @ApiOperation({summary: 'Логинизация админа'})
    @ApiResponse({status: 200, type: Token})
    @Post('/login')
    login(@Body() adminDto: CreateAdminDto) {

        return this.authAdminService.login(adminDto);
    }

    @ApiOperation({summary: 'Регистрация админа'})
    @ApiResponse({status: 200, type: Token})
    @Post('/registration')
    registration(@Body() adminDto: CreateAdminDto) {

        return this.authAdminService.registration(adminDto);
    }
}
