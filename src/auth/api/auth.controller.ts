import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "../application/auth.service";
import { LoginDto, TokenDto } from "../domain/dto/auth.dto";
import { MessageDto } from "../domain/dto/message.dto";
import { RefreshTokenGuard } from "../guards/refresh.token.guard";
import { CreateUserDto } from "../../users/domain/dto/create-user.dto";
import { cookieConfigToken } from "../../helpers/cookie.config";
import { UsersQueryRepository } from "../../users/infrastructure/users.query.repository";
import { JwtService } from "../application/jwt-service";

@ApiTags("Авторизация")
@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersQueryRepository: UsersQueryRepository,
    private jwtService: JwtService
  ) {}

  @ApiOperation({ summary: "Логинизация" })
  @ApiResponse({ status: 200, type: TokenDto })
  @Post("/login")
  async login(@Body() userDto: LoginDto, @Res() res) {
    const user = this.authService.checkCredentials(userDto);
    if (!user) throw new UnauthorizedException();

    const tokens = await this.jwtService.createJWTTokens(user);
    res
      .cookie("refreshToken", tokens.refreshToken, cookieConfigToken)
      .status(200)
      .send({
        accessToken: tokens.accessToken,
      });
  }

  @ApiOperation({ summary: "Регистрация" })
  @ApiResponse({ status: 204, type: MessageDto })
  @HttpCode(204)
  @Post("/registration")
  async registration(@Body() managerDto: CreateUserDto) {
    const findUserByEmail = await this.usersQueryRepository.getUserByEmail(
      managerDto.email
    );

    if (findUserByEmail) {
      throw new BadRequestException({
        message: "Менеджер существует",
        field: "email",
      });
    }
    console.log("go to registration");
    return this.authService.registration(managerDto);
  }

  @UseGuards(RefreshTokenGuard)
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
