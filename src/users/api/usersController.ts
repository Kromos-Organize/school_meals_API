import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards,} from "@nestjs/common";
import {UsersService} from "src/users/application/users.service";
import {User} from "../domain/entities/user.model";
import {RoleEnum} from "../domain/entities/role.enum";
import {RegistrationDto} from "../../auth/domain/dto/auth-request.dto";
import {UpdateUserDto} from "../domain/dto/user-request.dto";
import {IUserModelAttr} from "../domain/dto/user-service.dto";
import {UserDeleteResponseDto, UserResponseDto} from "../domain/dto/user-response.dto";
import {BadCheckEntitiesException} from "../../helpers/exception/BadCheckEntitiesException";
import {AuthGuard} from "@nestjs/passport";

@ApiTags("Сотрудники школы")
@Controller("user")
@UseGuards(AuthGuard())
export class UsersController {

  constructor(private usersService: UsersService,
              private userException: BadCheckEntitiesException) {}

  @ApiOperation({ summary: "Получение списка пользователей" })
  @ApiResponse({ status: 200, type: [UserResponseDto] })
  @Get()
  getAll() {

    return this.usersService.getAll();
  }

  @ApiOperation({ summary: "Получение данных пользователя по емейлу" })
  @ApiResponse({ status: 200, type: UserResponseDto })
  @Get('/email')
  async get(@Query("email") email: string) {

    const user = await this.usersService.getByEmail(email);

    this.userException.checkThrowUsers(!user, 'not', ['email']);

    return user;
  }

  @ApiOperation({ summary: "Создание пользователя (Учителя)" })
  @ApiResponse({ status: 201, type: UserResponseDto })
  @Post("/create")
  async create(@Body() userDto: RegistrationDto) {

    const user = await this.usersService.getByEmail(userDto.email);

    this.userException.checkThrowUsers(user, 'yep', ['email']);

    const inputModel: IUserModelAttr = {
      email: userDto.email,
      password: userDto.password,
      phone: userDto.phone,
      role: RoleEnum.employee,
      isActive: true,
    };

    return this.usersService.createUser(inputModel);
  }

  @ApiOperation({ summary: "Изменение данных пользователя" })
  @ApiResponse({ status: 200, type: UserResponseDto })
  @Put(":user_id")
  async update(@Param("user_id") user_id: number, @Body() userDto: UpdateUserDto) {

    const user = await this.usersService.getById(user_id);

    this.userException.checkThrowUsers(!user, 'not', ['user_id']);

    return this.usersService.updateUser(user_id, userDto);
  }

  @ApiOperation({ summary: "Удаление пользователя" })
  @ApiResponse({ status: 200, type: UserDeleteResponseDto})
  @Delete(":user_id")
  async remove(@Param("user_id") user_id: number) {

    const user = await this.usersService.getById(user_id);

    this.userException.checkThrowUsers(!user, 'not', ['user_id']);

    return this.usersService.removeUser(user_id);
  }
}
