import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UseGuards} from "@nestjs/common";
import {ClassService} from "../application/class.service";
import {AuthGuard} from "@nestjs/passport";
import {ClassParamDto, ClassQueryDto, CreateClassDto, UpdateClassDto} from "../domain/dto/class-request.dto";
import {ClassDeleteResponseDto, CountClassesResponseDto} from "../domain/dto/class-response.dto";
import {SchoolService} from "../../school/application/school.service";
import {BadCheckEntitiesException} from "../../helpers/exception/BadCheckEntitiesException";
import {BadRequestResult} from "../../helpers/exception/badRequestResult";
import {Class} from "../domain/entity/class.model";
import {IsBlockCabinetUserGuard} from "../../users/guards/isBlockCabinet.user.guard";
import { UsersService } from 'src/users/application/users.service';

@ApiTags('Классы')
@ApiBearerAuth()
@ApiResponse({status: 401, description: 'Некорректный аксесс-токен'})
@Controller('class')
@UseGuards(AuthGuard())
export class ClassController {

    constructor(
        private schoolService: SchoolService,
        private classService: ClassService,
        private userService: UsersService,
        private badException: BadCheckEntitiesException,
    ) { }

    @ApiOperation({summary: 'Получить список классов'})
    @ApiResponse({status: 200, type: [Class], description: 'Успешное получение списка классов'})
    @ApiResponse({status: 400, type: BadRequestResult, description: BadCheckEntitiesException.errorMessage('school','not')})
    @HttpCode(200)
    @Get()
    async getAll(@Query() queryDto: ClassQueryDto) {

        const school = await this.schoolService.getSchoolById(queryDto.school_id);

        this.badException.checkAndGenerateException(!school, 'school','not', ['school_id'])

        return this.classService.getAll(queryDto.school_id);
    }

    @ApiOperation({summary: "Получение количества классов одной школы"})
    @ApiResponse({ status: 200, type: CountClassesResponseDto, description: 'Успешное количества классов пользователей"' })
    @HttpCode(200)
    @Get('/count')
    async getCountClassesBySchool(@Query() paramDto: ClassQueryDto) {

        const school = await this.schoolService.getSchoolById(paramDto.school_id);

        this.badException.checkAndGenerateException(!school, 'school','not', ['school_id'])

        return await this.classService.getCountClassesBySchool(paramDto.school_id);
    }

    @ApiOperation({summary: 'Получить данные класса'})
    @ApiResponse({status: 200, type: Class, description: 'Успешное получение данных класса'})
    @ApiResponse({status: 400, type: BadRequestResult, description: BadCheckEntitiesException.errorMessage('class','not')})
    @HttpCode(200)
    @UseGuards(IsBlockCabinetUserGuard)
    @Get(':class_id')
    async get(@Param() paramDto: ClassParamDto){

        console.log(paramDto)

        const classSchool =  await this.classService.getClassById(paramDto.class_id)

        this.badException.checkAndGenerateException(!classSchool, 'class', 'not', ['class_id'])

        return classSchool;
    }

    @ApiOperation({summary: 'Добавить класс'})
    @ApiResponse({status: 201, type: Class, description: 'Успешное добавление класса'})
    @ApiResponse({status: 400, type: BadRequestResult, description:
            BadCheckEntitiesException.errorMessage('school','not') + ' / ' + BadCheckEntitiesException.errorMessage('class','yep')})
    @HttpCode(201)
    @Post()
    async create(@Body() classDto: CreateClassDto) {

        const school = await this.schoolService.getSchoolById(classDto.school_id);

        this.badException.checkAndGenerateException(!school, 'school','not', ['school_id']);

        const user = await this.userService.getById(classDto.user_id);

        this.badException.checkAndGenerateException(!user, 'user', 'not', ['user_id']);

        const classForUser = await this.classService.checkUserForClassById(classDto.user_id);

        this.badException.checkAndGenerateException(classForUser, 'teacher_class', 'more_class', ['user_id']);

        const classSchool = await this.classService.getClassByParams(classDto);

        this.badException.checkAndGenerateException(classSchool, 'class','yep', ['school_id', 'number', 'type']);

        return this.classService.create(classDto);
    }

    @ApiOperation({summary: 'Обновить данные класса'})
    @ApiResponse({status: 200, type: Class, description: 'Успешное обновление данных класса'})
    @ApiResponse({status: 400, type: BadRequestResult, description: BadCheckEntitiesException.errorMessage('class','not')})
    @HttpCode(200)
    @Put(':class_id')
    async update(@Param() paramDto: ClassParamDto, @Body() classDto: UpdateClassDto) {

        const classSchool =  await this.classService.getClassById(paramDto.class_id)

        this.badException.checkAndGenerateException(!classSchool, 'class','not', ['class_id'])

        return this.classService.update(paramDto.class_id, classDto);
    }

    @ApiOperation({summary: 'Удалить класс'})
    @ApiResponse({status: 200, type: ClassDeleteResponseDto, description: 'Успешное удаление класса'})
    @ApiResponse({status: 400, type: BadRequestResult, description: BadCheckEntitiesException.errorMessage('class','not')})
    @HttpCode(200)
    @Delete(':class_id')
    async remove(@Param() paramDto: ClassParamDto) {

        const classSchool =  await this.classService.getClassById(paramDto.class_id)

        this.badException.checkAndGenerateException(!classSchool, 'class','not', ['class_id'])

        return this.classService.remove(paramDto.class_id);
    }
}