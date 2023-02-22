import {BadRequestException, Body, Controller, HttpCode, Post, Req, Res, UseGuards,} from "@nestjs/common";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {AuthService} from "../application/auth.service";
import {LoginDto, RegistrationDto} from "../domain/dto/auth-request.dto";
import {RefreshTokenGuard} from "../guards/refresh.token.guard";
import {cookieConfigToken} from "../../helpers/cookie.config";
import {UsersQueryRepository} from "../../users/infrastructure/users.query.repository";
import {JwtService} from "../application/jwt-service";
import {LoginResponseDto, RefreshTokenResponseDto, RegisterResponseDto} from "../domain/dto/auth-response.dto";

@ApiTags("Авторизация")
@Controller("auth")
export class AuthController {

  constructor(
    private authService: AuthService,
    private usersQueryRepository: UsersQueryRepository,
    private jwtService: JwtService
  ) {}

  @ApiOperation({ summary: "Логинизация" })
  @ApiResponse({ status: 200, type: LoginResponseDto })
  @Post("/login")
  async login(@Body() userDto: LoginDto, @Res() res) {

    const user = await this.authService.checkCredentials(userDto);

    if (!user) {

      throw new BadRequestException({
        message: "Администратор не существует",
        fields: ["email"],
      });
    }

    const tokens = await this.jwtService.createJWTTokens(user);

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

    if (findUserByEmail) {

      throw new BadRequestException({
        message: "Администратор существует",
        fields: ["email"],
      });
    }

    return this.authService.registration(userDto);
  }

  @UseGuards(RefreshTokenGuard)
  @ApiOperation({ summary: "Обновление токена" })
  @ApiResponse({ status: 200, type: RefreshTokenResponseDto })
  @Post("/refresh-token")
  async resendingRefreshTokens(@Req() req, @Res() res) {

    if (req.user) {

      const tokens = await this.jwtService.createJWTTokens(req.user);

      res
        .cookie("refreshToken", tokens.refreshToken, cookieConfigToken)
        .status(200)
        .send({
          accessToken: tokens.accessToken,
        });
    }
  }
}
