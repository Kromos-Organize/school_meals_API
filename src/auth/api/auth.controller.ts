import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Req,
    Res,
    UnauthorizedException,
    UseGuards,
} from "@nestjs/common";
import {ApiCookieAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {AuthService} from "../application/auth.service";
import {EmailInputDto, LoginDto, NewPasswordDto, RegistrationDto} from "../domain/dto/auth-request.dto";
import {RefreshTokenGuard} from "../guards/refresh.token.guard";
import {cookieConfigToken} from "../../helpers/cookie.config";
import {UsersQueryRepository} from "../../users/infrastructure/users.query.repository";
import {JwtService} from "../application/jwt-service";
import {LoginResponseDto, RefreshTokenResponseDto, RegisterResponseDto} from "../domain/dto/auth-response.dto";
import {BadCheckEntitiesException} from "../../helpers/exception/BadCheckEntitiesException";
import {IsActiveUserAuthGuard} from "../guards/isActive-user.auth.guard";
import {Cookies, SuperAdmin} from "../../helpers/param-decorators/custom-decorators";
import {BadRequestResult} from "../../helpers/exception/badRequestResult";
import {UnauthorizedResult} from "../../helpers/exception/unauthorizedResult";
import {ForbiddenResult} from "../../helpers/exception/forbiddenResult";
import {SessionService} from "../../session/application/SessionService";
import {ISessionCreateDTO} from "../../session/domain/dto/session-service.dto";
import {SuperAdminCabinInput} from "../../admin/domain/dto/admin-request.dto";
import {IsAdminGuard} from "../../admin/guards/isAdmin.guard";
import {ISuperAdmin} from "../domain/dto/auth-service.dto";


@ApiTags("Авторизация")
@Controller("auth")
export class AuthController {

    constructor(
        private authService: AuthService,
        private usersQueryRepository: UsersQueryRepository,
        private jwtService: JwtService,
        private badException: BadCheckEntitiesException,
        private sessionService: SessionService,
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

            const sessionData: ISessionCreateDTO = {
                ip: req.get('host'),
                device_name: req.get("user-agent"),
                user_id: user.id,
            }

            const session = await this.sessionService.getSessionByDeviceAndIP(sessionData)

            if (!session || session.logged_out || session.expires_at < new  Date()) {
                await this.sessionService.createSession(sessionData)
            } else {
                await this.sessionService.updateLastSessionUsage(sessionData)
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
    @ApiOperation({summary: "Обновление аксесс-токена"})
    @ApiResponse({status: 200, type: RefreshTokenResponseDto, description: 'Успешное обновление аксесс-токена'})
    @ApiResponse({status: 401, type: UnauthorizedResult, description: 'Некорректный рефреш-токен'})
    @Post("/refresh-token")
    async resendingRefreshTokens(@Req() req, @Res() res) {

        if (req.user) {

            const tokens = await this.jwtService.createJWTTokens(req.user, false);

            res.send({id: req.user.id, role: req.user.role, accessToken: tokens.accessToken,})
        }
    }

    @ApiOperation({summary: "Восстановление пароля"})
    @ApiResponse({status: 201, description: 'Успешное восстановление пароля'})
    @ApiResponse({status: 400, type: BadRequestResult, description: BadCheckEntitiesException.errorMessage("user", 'yep')})
    @Post("/recovery-password")
    async recoveryPassword(@Body() inputEmail: EmailInputDto) {

        const user = await this.usersQueryRepository.getUserByEmail(inputEmail.email);

        this.badException.checkAndGenerateException(!user, 'user', 'not', ['email']);

        return this.authService.sendRecoveryCode(user);
    }

    @ApiOperation({summary: "Смена пароля"})
    @ApiResponse({status: 204, description: 'Успешная смена пароля'})
    @ApiResponse({status: 400, type: BadRequestResult, description: BadCheckEntitiesException.errorMessage("user", 'yep')})
    @HttpCode(HttpStatus.NO_CONTENT)
    @Post("/new-password")
    async addNewPassword(@Body() inputPasswordDto: NewPasswordDto) {

        return this.authService.confirmPassword(inputPasswordDto)
    }

    @ApiOperation({summary: 'Вход для супер-админа'})
    @ApiResponse({status: 200, description: 'Успешный вход в кабинет админа'})
    @ApiResponse({status: 401, type: BadRequestResult, description: BadCheckEntitiesException.errorMessage('admin', 'yep')})
    @UseGuards(IsAdminGuard)
    @HttpCode(200)
    @Post('login/cabinet')
    async enterToCabinet(@Body() inputDto: SuperAdminCabinInput, @SuperAdmin() adminData: ISuperAdmin) {

        const token = this.jwtService.createToken(
            {id: adminData.id, role: adminData.role, email: adminData.email},
            'ACCESS_JWT_SECRET',
            process.env.TIME_LIFE_ACCESS);

        return {
            id: adminData.id,
            role: adminData.role,
            email: adminData.email,
            name: adminData.name,
            fname: adminData.fname,
            accessToken: token,
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
        const sessionData: ISessionCreateDTO = {
            ip: req.get('host'),
            device_name: req.get("user-agent"),
            user_id: req.user.id,
        }
        await this.sessionService.logoutUserSession(sessionData)

        res.clearCookie('refreshToken').sendStatus(204);
    }
}
