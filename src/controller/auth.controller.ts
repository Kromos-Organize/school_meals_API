import { Body, Controller, HttpCode, Post, Req, Res, UseGuards, UsePipes } from "@nestjs/common";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateEmployeeDto} from "../dto/create-employee.dto";
import {AuthService} from "../service/auth.service";
import {LoginDto, Token} from "../dto/auth.dto";
import {ValidationBody} from "../validate/valdationBody.pipe";
import { RefreshTokenGuard } from "../guard/refresh.token.guard";
import { JwtService } from "@nestjs/jwt";

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService, private jwtService: JwtService) { }

    @ApiOperation({summary: 'Логинизация'})
    @ApiResponse({status: 200, type: Token})
    @UsePipes(ValidationBody)
    @Post('/login')
    async login(@Body() userDto: LoginDto, @Res() res) {

        const tokens = await this.authService.login(userDto)
        res
          .cookie('refreshToken', tokens.refreshToken, {
              maxAge: 200000000,
              httpOnly: true,
              secure: true,
          })
          .status(200)
          .send({
              accessToken: tokens.accessToken,
          });
    }

    @ApiOperation({summary: 'Регистрация'})
    @ApiResponse({status: 200, type: Token})
    @UsePipes(ValidationBody)
    @Post('/registration')
    @HttpCode(204)
    registration(@Body() employeeDto: CreateEmployeeDto) {
        console.log('NoN');

        return this.authService.registration(employeeDto)
    }

  @UseGuards(RefreshTokenGuard)
  @Post('/refresh-token')
  async resendingRefreshTokens(
    @Req() req,
    @Res() res,
  ) {
      if (req.employee) {
        const accessToken = this.jwtService.sign(
          {
            id: req.employee.employee_id,
            email: req.employee.email,
            role: req.employee.role,
          },{
            expiresIn: '15m',
          },
        );

        const refreshToken = this.jwtService.sign(
          {
            id: req.employee.employee_id,
            email: req.employee.email,
            role: req.employee.role,
          },{ expiresIn: '30d' },
        );
        res
          .cookie('refreshToken', refreshToken, {
            maxAge: 2000000,
            httpOnly: true,
            secure: true,
          })
          .status(200)
          .send({
            accessToken: accessToken,
          });
      }

  }

}
