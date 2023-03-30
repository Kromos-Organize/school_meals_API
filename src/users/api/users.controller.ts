import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards,} from "@nestjs/common";
import {UsersService} from "../application/users.service";
import {ActiveUserDto, CreateEmployee, UpdateUserDto, UserParamDto} from "../domain/dto/user-request.dto";
import {UserActivateResponseDto, UserDeleteResponseDto, UserResponseDto} from "../domain/dto/user-response.dto";
import {BadCheckEntitiesException} from "../../helpers/exception/BadCheckEntitiesException";
import {AuthGuard} from "@nestjs/passport";
import {BadRequestResult} from "../../helpers/exception/badRequestResult";

@ApiTags("Пользователи")
@ApiBearerAuth()
@ApiResponse({status: 401, description: 'Некорректный аксесс-токен'})
@Controller("user")
@UseGuards(AuthGuard('jwt'))
export class UsersController {

    constructor(
        private usersService: UsersService,
        private badException: BadCheckEntitiesException
    ) { }


    @ApiOperation({summary: "Получение списка пользователей"})
    @ApiResponse({status: 200, type: [UserResponseDto], description: 'Успешное получение списка пользователей'})
    @HttpCode(200)
    @Get()
    getAll() {

        return this.usersService.getAll();
    }


    @ApiOperation({summary: "Получение данных пользователя"})
    @ApiResponse({status: 200, type: UserResponseDto, description: 'Успешное получение данных пользователя'})
    @ApiResponse({status: 400, type: BadRequestResult, description: BadCheckEntitiesException.errorMessage('user', 'not')})
    @HttpCode(200)
    @Get('/one/:user_id')
    async get(@Param() paramDto: UserParamDto) {

        const user = await this.usersService.getById(paramDto.user_id);

        this.badException.checkAndGenerateException(!user, 'user', 'not', ['user_id']);

        return user;
    }


    @ApiOperation({summary: "Получение списка пользователя для модерации"})
    @ApiResponse({status: 200, type: [UserResponseDto], description: 'Успешное получение списка пользователей для модерации"'})
    @HttpCode(200)
    @Get('/moderation')
    async getUserModeration() {

        return await this.usersService.getUserModeration();
    }


    @ApiOperation({summary: "Создание пользователя (Учителя)"})
    @ApiResponse({status: 201, type: UserResponseDto, description: 'Успешное создание пользователя (Учителя)'})
    @ApiResponse({status: 400, type: BadRequestResult, description: BadCheckEntitiesException.errorMessage('user', 'yep')})
    @HttpCode(201)
    @Post("/create")
    async create(@Body() userDto: CreateEmployee) {

        const user = await this.usersService.getByEmail(userDto.email);

        this.badException.checkAndGenerateException(user, 'user', 'yep', ['email']);

        return this.usersService.createUser(userDto);
    }


    @ApiOperation({summary: "Изменение данных пользователя"})
    @ApiResponse({status: 200, type: UserResponseDto, description: 'Успешное изменение данных пользователя'})
    @ApiResponse({status: 400, type: BadRequestResult, description: BadCheckEntitiesException.errorMessage('user', 'not')})
    @HttpCode(200)
    @Put(":user_id")
    async update(@Param() paramDto: UserParamDto, @Body() userDto: UpdateUserDto) {

        const user = await this.usersService.getById(paramDto.user_id);

        this.badException.checkAndGenerateException(!user, 'user', 'not', ['user_id']);

        return this.usersService.updateUser(paramDto.user_id, userDto);
    }


    @ApiOperation({summary: "Активация/Деактивация пользователя"})
    @ApiResponse({status: 200, type: UserActivateResponseDto, description: 'Успешная активация/деактивация пользователя'})
    @ApiResponse({status: 400, type: BadRequestResult, description: BadCheckEntitiesException.errorMessage('user', 'not')})
    @HttpCode(200)
    @Put("/activate/:user_id")
    async changeActiveUser(@Param() paramDto: UserParamDto, @Body() activeDto: ActiveUserDto) {

        const user = await this.usersService.getById(paramDto.user_id);

        this.badException.checkAndGenerateException(!user, 'user', 'not', ['user_id']);

        return this.usersService.changeActiveUser(paramDto.user_id, activeDto);
    }


    @ApiOperation({summary: "Удаление пользователя"})
    @ApiResponse({status: 200, type: UserDeleteResponseDto, description: 'Успешное удаление пользователя'})
    @ApiResponse({status: 400, type: BadRequestResult, description: BadCheckEntitiesException.errorMessage('user', 'not')})
    @HttpCode(200)
    @Delete(":user_id")
    async remove(@Param() paramDto: UserParamDto) {

        const user = await this.usersService.getById(paramDto.user_id);

        this.badException.checkAndGenerateException(!user, 'user', 'not', ['user_id']);

        return this.usersService.removeUser(paramDto.user_id);
    }
}
