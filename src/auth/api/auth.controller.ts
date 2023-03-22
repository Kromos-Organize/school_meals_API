import {Body, Controller, HttpCode, Post, Req, Res, UnauthorizedException, UseGuards,} from "@nestjs/common";
import {ApiCookieAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {AuthService} from "../application/auth.service";
import {LoginDto, RegistrationDto} from "../domain/dto/auth-request.dto";
import {RefreshTokenGuard} from "../guards/refresh.token.guard";
import {cookieConfigToken} from "../../helpers/cookie.config";
import {UsersQueryRepository} from "../../users/infrastructure/users.query.repository";
import {JwtService} from "../application/jwt-service";
import {LoginResponseDto, RefreshTokenResponseDto, RegisterResponseDto} from "../domain/dto/auth-response.dto";
import {BadCheckEntitiesException} from "../../helpers/exception/BadCheckEntitiesException";
import {IsActiveUserAuthGuard} from "../guards/isActive-user.auth.guard";
import {Cookies} from "../../helpers/param-decorators/custom-decorators";
import {BadRequestResult} from "../../helpers/exception/badRequestResult";
import {UnauthorizedResult} from "../../helpers/exception/unauthorizedResult";
import {ForbiddenResult} from "../../helpers/exception/forbiddenResult";
import {SessionCreateDTO} from "../session/domain/dto/session-service.dto";
import {SessionService} from "../session/application/SessionService";


@ApiTags("Авторизация")
@Controller("auth")
export class AuthController {

    constructor(
        private authService: AuthService,
        private usersQueryRepository: UsersQueryRepository,
        private jwtService: JwtService,
        private badException: BadCheckEntitiesException,
        private sessionService: SessionService
    ) {
    }

    @UseGuards(IsActiveUserAuthGuard)
    @ApiOperation({summary: "Логинизация"})
    @ApiResponse({status: 200, type: LoginResponseDto, description: 'Успешный вход в систему'})
    @ApiResponse({status: 400, type: BadRequestResult, description: BadCheckEntitiesException.errorMessage('auth', 'incorrectAuth')})
    @ApiResponse({status: 403, type: ForbiddenResult, description: 'Пользователь не активирован'})
    @Post("/login")
    async login(@Body() userDto: LoginDto, @Req() req, @Res() res) {

        const user = await this.authService.checkCredentials(userDto);

        this.badException.checkAndGenerateException(!user, 'auth', 'incorrectAuth', ['email', 'password']);

        const tokens = await this.jwtService.createJWTTokens(user, true);

        if (user) {
            delete user.password;
            const sessionData: SessionCreateDTO = {
                ip: req.get('host'),
                device_name: req.get("user-agent"),
                user_id: user.id,
            }
            const session = await this.sessionService.getSessionByDeviceAndIP(sessionData)
            if (!session || session.logged_out) {
                await this.sessionService.createSession(sessionData)
            } else {
                await this.sessionService.updateLastSessionUsage(sessionData, new Date())
            }
        }

        res
            .cookie("refreshToken", tokens.refreshToken, cookieConfigToken)
            .send({
                ...user,
                accessToken: tokens.accessToken,
            });
    }

    @ApiOperation({summary: "Регистрация"})
    @ApiResponse({status: 201, type: RegisterResponseDto, description: 'Успешная регистрация пользователя'})
    @ApiResponse({status: 400, type: BadRequestResult, description: BadCheckEntitiesException.errorMessage("user", 'yep')})
    @HttpCode(201)
    @Post("/registration")
    async registration(@Body() userDto: RegistrationDto) {

        const findUserByEmail = await this.usersQueryRepository.getUserByEmail(userDto.email);

        this.badException.checkAndGenerateException(findUserByEmail, "user", 'yep', ['email'])

        return this.authService.registration(userDto);
    }

    @UseGuards(RefreshTokenGuard)
    @ApiCookieAuth()
    @ApiOperation({summary: "Обновление токена"})
    @ApiResponse({status: 200, type: RefreshTokenResponseDto, description: 'Успешное обновление токенов'})
    @ApiResponse({status: 401, type: UnauthorizedResult, description: 'Некорректный рефреш-токен'})
    @Post("/refresh-token")
    async resendingRefreshTokens(@Req() req, @Res() res) {

        if (req.user) {

            const tokens = await this.jwtService.createJWTTokens(req.user, false);

            res.send({id: req.user.id, role: req.user.role, accessToken: tokens.accessToken,})
        }
    }

    @UseGuards(RefreshTokenGuard)
    @ApiCookieAuth()
    @ApiOperation({summary: "Выход из системы"})
    @ApiResponse({status: 201, type: '', description: 'Успешный выход из системы'})
    @ApiResponse({status: 400, type: BadRequestResult, description: BadCheckEntitiesException.errorMessage("auth", 'notAuth')})
    @ApiResponse({status: 401, type: UnauthorizedResult, description: 'Некорректный рефреш-токен'})
    @Post("/logout")
    async logout(@Cookies() refreshToken: string, @Req() req, @Res() res) {

        this.badException.checkAndGenerateException(!refreshToken, "auth", 'notAuth', ['email'])

        if (!refreshToken) {
            throw new UnauthorizedException()
        }
        const sessionData: SessionCreateDTO = {
            ip: req.get('host'),
            device_name: req.get("user-agent"),
            user_id: req.user.id,
        }
        await this.sessionService.logoutUserSession(sessionData)

        res.clearCookie('refreshToken').sendStatus(204);
    }
}
