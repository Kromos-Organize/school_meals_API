import {Body, Controller, HttpCode, Post, Req, Res, UseGuards,} from "@nestjs/common";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {AuthService} from "../application/auth.service";
import {LoginDto, RegistrationDto} from "../domain/dto/auth-request.dto";
import {RefreshTokenGuard} from "../guards/refresh.token.guard";
import {cookieConfigToken} from "../../helpers/cookie.config";
import {UsersQueryRepository} from "../../users/infrastructure/users.query.repository";
import {JwtService} from "../application/jwt-service";
import {LoginResponseDto, RefreshTokenResponseDto, RegisterResponseDto} from "../domain/dto/auth-response.dto";
import {BadCheckEntitiesException} from "../../helpers/exception/BadCheckEntitiesException";

@ApiTags("Авторизация")
@Controller("auth")
export class AuthController {

  constructor(
    private authService: AuthService,
    private usersQueryRepository: UsersQueryRepository,
    private jwtService: JwtService,
    private authException: BadCheckEntitiesException,
  ) {}

  @ApiOperation({ summary: "Логинизация" })
  @ApiResponse({ status: 200, type: LoginResponseDto })
  @Post("/login")
  async login(@Body() userDto: LoginDto, @Res() res) {

    const user = await this.authService.checkCredentials(userDto);

    this.authException.checkThrowAuth(!user, 'not',['email','password'])

    const tokens = await this.jwtService.createJWTTokens(user, true);

    if (user) delete user.password;

    res
      .cookie("refreshToken", tokens.refreshToken, cookieConfigToken)
      .status(200)
      .send({
        ...user,
        accessToken: tokens.accessToken,
      });
  }

  @ApiOperation({ summary: "Регистрация" })
  @ApiResponse({ status: 201, type: RegisterResponseDto })
  @HttpCode(201)
  @Post("/registration")
  async registration(@Body() userDto: RegistrationDto) {

    const findUserByEmail = await this.usersQueryRepository.getUserByEmail(userDto.email);

    this.authException.checkThrowUsers(findUserByEmail, 'yep',['email']);

    return this.authService.registration(userDto);
  }

  @UseGuards(RefreshTokenGuard)
  @ApiOperation({ summary: "Обновление токена" })
  @ApiResponse({ status: 200, type: RefreshTokenResponseDto })
  @Post("/refresh-token")
  async resendingRefreshTokens(@Req() req, @Res() res) {

    if (req.user) {

      const tokens = await this.jwtService.createJWTTokens(req.user, false);

      res
        .status(200)
        .send({accessToken: tokens.accessToken})
    }
  }
}
