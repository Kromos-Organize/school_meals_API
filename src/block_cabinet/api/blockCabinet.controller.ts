import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Delete, Get, HttpCode, Param, Post, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {BlockCabinetService} from "../application/blockCabinet.service";
import {SchoolService} from "../../school/application/school.service";
import {UsersService} from "../../users/application/users.service";
import {BlockCabinet} from "../domain/entity/blockCabinet.model";
import {BadCheckEntitiesException} from "../../helpers/exception/BadCheckEntitiesException";
import {BlockCabinetRequestDto, ParamRemoveCabinet} from "../domain/dto/blockCabinet-request.dto";
import {BadRequestResult} from "../../helpers/exception/badRequestResult";

@ApiTags('Блокировка кабинета')
@ApiBearerAuth()
@ApiResponse({status: 401, description: 'Некорректный аксесс-токен'})
@Controller('block_cabinet')
@UseGuards(AuthGuard('jwt'))
export class BlockCabinetController {

    constructor(
        private blockCabinetService: BlockCabinetService,
        private schoolService: SchoolService,
        private userService: UsersService,
        private badException: BadCheckEntitiesException,
    ) { }

    @ApiOperation({summary: 'Получить список заблокироавнных кабинетов'})
    @ApiResponse({status: 200, type: [BlockCabinet], description: 'Успешное получение списка заблокироавнных кабинетов'})
    @HttpCode(200)
    @Get()
    async getAll() {

        return await this.blockCabinetService.getAll();
    }

    @ApiOperation({summary: 'Добавить пользователя для блокировки'})
    @ApiResponse({status: 201, type: BlockCabinet, description: 'Успешное добавление пользователя'})
    @ApiResponse({status: 400, type: BadRequestResult, description:
            BadCheckEntitiesException.errorMessage('school','not') + ' / ' + BadCheckEntitiesException.errorMessage('blockCabinet','yep') + ' / ' + BadCheckEntitiesException.errorMessage('user','not')})
    @HttpCode(201)
    @Post()
    async addUser(@Body() userDto: BlockCabinetRequestDto) {

        const user = await this.userService.getById(userDto.user_id)
        this.badException.checkAndGenerateException(!user, 'user', 'not', ['user_id']);

        let school;

        if (userDto.school_id) {
            school = await this.schoolService.getSchoolById(userDto.school_id);
            this.badException.checkAndGenerateException(!school, 'school', 'not', ['school_id']);
        }

        const cabinet = await this.blockCabinetService.getUserById(userDto.user_id);
        this.badException.checkAndGenerateException(cabinet, 'blockCabinet', 'yep', ['user_id']);

        return this.blockCabinetService.addUser(userDto);
    }

    @ApiOperation({summary: 'Добавить id школы к заблокированному пользователю'})
    @ApiResponse({status: 200, type: BlockCabinet, description: 'Успешное добавление id школы'})
    @ApiResponse({status: 400, type: BadRequestResult, description: BadCheckEntitiesException.errorMessage('blockCabinet','yep')})
    @HttpCode(201)
    @Delete(':id')
    async removeCabinet(@Param() paramDto: ParamRemoveCabinet) {

        const cabinet = await this.blockCabinetService.getById(paramDto.id);
        this.badException.checkAndGenerateException(!cabinet, 'blockCabinet', 'not', ['id']);

        return this.blockCabinetService.removeCabinet(paramDto.id);
    }
}