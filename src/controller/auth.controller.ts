import {Body, Controller, HttpCode, Post, Req, Res, UseGuards} from "@nestjs/common";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {AuthService} from "../service/auth.service";
import {LoginDto, TokenDto} from "../dto/auth.dto";
import {MessageDto} from "../dto/message.dto";
import {RefreshTokenGuard} from "../guard/refresh.token.guard";
import {CreateManagerDto} from "../dto/create-manager.dto";
import {JwtTokenService} from "../service/jwtToken.service";
import {cookieConfigToken} from "../helper/cookie.config";

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService, private jwtTokenService: JwtTokenService) {
    }

    @ApiOperation({summary: 'Логинизация'})
    @ApiResponse({status: 200, type: TokenDto})
    @Post('/login')
    async login(@Body() userDto: LoginDto, @Res({ passthrough: true }) res) {

        const tokens = await this.authService.login(userDto)

        res.cookie('refreshToken', tokens.refreshToken, cookieConfigToken).status(200)

        return {
            accessToken: tokens.accessToken,
        }
    }

    @ApiOperation({summary: 'Регистрация'})
    @ApiResponse({status: 204, type: MessageDto})
    @HttpCode(204)
    @Post('/registration')
    registration(@Body() managerDto: CreateManagerDto) {

        return this.authService.registration(managerDto)
    }

    @UseGuards(RefreshTokenGuard)
    @Post('/refresh-token')
    async resendingRefreshTokens(@Req() req, @Res() res) {

        if (req.user) {

            const tokens = this.jwtTokenService.generateToken(req.user)

            res.cookie('refreshToken', tokens.refreshToken, cookieConfigToken)
                .status(200)
                .send({
                    accessToken: tokens.accessToken,
                });
        }
    }
}
