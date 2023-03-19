import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards,} from "@nestjs/common";
import {UsersService} from "src/users/application/users.service";
import {RoleEnum} from "../domain/entities/role.enum";
import {RegistrationDto} from "../../auth/domain/dto/auth-request.dto";
import {ActiveUserDto, UpdateUserDto} from "../domain/dto/user-request.dto";
import {IUserModelAttr} from "../domain/dto/user-service.dto";
import {UserActivateResponseDto, UserDeleteResponseDto, UserResponseDto} from "../domain/dto/user-response.dto";
import {BadCheckEntitiesException} from "../../helpers/exception/BadCheckEntitiesException";
import {AuthGuard} from "@nestjs/passport";
import {BadRequestResult} from "../../helpers/exception/badRequestResult";

@ApiTags("Пользователи")
@Controller("user")
@UseGuards(AuthGuard())
export class UsersController {

    constructor(private usersService: UsersService,
                private badException: BadCheckEntitiesException) {
    }


    @ApiOperation({summary: "Получение списка пользователей"})
    @ApiBearerAuth()
    @ApiResponse({status: 200, type: [UserResponseDto], description: 'Успешное получение списка пользователей'})
    @ApiResponse({status: 401, description: 'Некорректный аксесс-токен'})
    @HttpCode(200)
    @Get()
    getAll() {

        return this.usersService.getAll();
    }


    @ApiOperation({summary: "Получение данных пользователя"})
    @ApiBearerAuth()
    @ApiResponse({status: 200, type: UserResponseDto, description: 'Успешное получение данных пользователя'})
    @ApiResponse({status: 400, type: BadRequestResult, description: 'Пользователь не найден'})
    @ApiResponse({status: 401, description: 'Некорректный аксесс-токен'})
    @HttpCode(200)
    @Get('/one/:user_id')
    async get(@Param("user_id") user_id: number) {

        const user = await this.usersService.getById(user_id);

        this.badException.checkAndGenerateException(!user, 'user', 'not', ['user_id']);

        return user;
    }


    @ApiOperation({summary: "Получение списка пользователя для модерации"})
    @ApiBearerAuth()
    @ApiResponse({status: 200, type: [UserResponseDto], description: 'Успешное получение списка пользователей для модерации"'})
    @ApiResponse({status: 401, description: 'Некорректный аксесс-токен'})
    @HttpCode(200)
    @Get('/moderation')
    async getUserModeration() {

        return await this.usersService.getUserModeration();
    }


    @ApiOperation({summary: "Создание пользователя (Учителя)"})
    @ApiBearerAuth()
    @ApiResponse({status: 201, type: UserResponseDto, description: 'Успешное создание пользователя (Учителя)'})
    @ApiResponse({status: 400, type: BadRequestResult, description: 'Пользователь уже существует'})
    @ApiResponse({status: 401, description: 'Некорректный аксесс-токен'})
    @HttpCode(201)
    @Post("/create")
    async create(@Body() userDto: RegistrationDto) {

        const user = await this.usersService.getByEmail(userDto.email);

        this.badException.checkAndGenerateException(user, 'user', 'yep', ['email']);

        const inputModel: IUserModelAttr = {
            email: userDto.email,
            password: userDto.password,
            phone: userDto.phone,
            role: RoleEnum.employee,
            isActive: true,
        };

        return this.usersService.createUser(inputModel);
    }


    @ApiOperation({summary: "Изменение данных пользователя"})
    @ApiBearerAuth()
    @ApiResponse({status: 200, type: UserResponseDto, description: 'Успешное изменение данных пользователя'})
    @ApiResponse({status: 400, type: BadRequestResult, description: 'Пользователь не существует'})
    @ApiResponse({status: 401, description: 'Некорректный аксесс-токен'})
    @HttpCode(200)
    @Put(":user_id")
    async update(@Param("user_id") user_id: number, @Body() userDto: UpdateUserDto) {

        const user = await this.usersService.getById(user_id);

        this.badException.checkAndGenerateException(!user, 'user', 'not', ['user_id']);

        return this.usersService.updateUser(user_id, userDto);
    }


    @ApiOperation({summary: "Активация/Деактивация пользователя"})
    @ApiBearerAuth()
    @ApiResponse({status: 200, type: UserActivateResponseDto, description: 'Успешная активация/деактивация пользователя'})
    @ApiResponse({status: 400, type: BadRequestResult, description: 'Пользователь не существует'})
    @ApiResponse({status: 401, description: 'Некорректный аксесс-токен'})
    @HttpCode(200)
    @Put("/activate/:user_id")
    async changeActiveUser(@Param("user_id") user_id: number, @Body() activeDto: ActiveUserDto) {

        const user = await this.usersService.getById(user_id);

        this.badException.checkAndGenerateException(!user, 'user', 'not', ['user_id']);

        return this.usersService.changeActiveUser(user_id, activeDto);
    }


    @ApiOperation({summary: "Удаление пользователя"})
    @ApiBearerAuth()
    @ApiResponse({status: 200, type: UserDeleteResponseDto, description: 'Успешное удаление пользователя'})
    @ApiResponse({status: 400, type: BadRequestResult, description: 'Пользователь не существует'})
    @ApiResponse({status: 401, description: 'Некорректный аксесс-токен'})
    @HttpCode(200)
    @Delete(":user_id")
    async remove(@Param("user_id") user_id: number) {

        const user = await this.usersService.getById(user_id);

        this.badException.checkAndGenerateException(!user, 'user', 'not', ['user_id']);

        return this.usersService.removeUser(user_id);
    }
}
