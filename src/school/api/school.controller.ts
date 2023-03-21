import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Req, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {SchoolService} from "../application/school.service";
import {SchoolCreateDto, SchoolParamDto, SchoolUpdateDto} from "../domain/dto/school-request.dto";
import {School} from "../domain/entities/school.model";
import {AuthGuard} from "@nestjs/passport";
import {BadCheckEntitiesException} from "../../helpers/exception/BadCheckEntitiesException";
import {SchoolDeleteResponseDto} from "../domain/dto/school-reponse.dto";
import {SearchUserGuard} from "../../auth/guards/search.user.guard";
import {UsersService} from "../../users/application/users.service";
import {BadRequestResult} from "../../helpers/exception/badRequestResult";

@ApiTags('Школа')
@ApiBearerAuth()
@ApiResponse({status: 401, description: 'Некорректный аксесс-токен'})
@Controller('school')
@UseGuards(AuthGuard())
export class SchoolController {

    constructor(
        private schoolService: SchoolService,
        private badException: BadCheckEntitiesException,
        private userService: UsersService
    ) { }

    @ApiOperation({summary: 'Получить список школ'})
    @ApiResponse({status: 200, type: [School], description: 'Успешное получение списка школ'})
    @HttpCode(200)
    @Get()
    getAll() {

        return this.schoolService.getAllSchool();
    }

    @ApiOperation({summary: 'Получить данные школы'})
    @ApiResponse({status: 200, type: School, description: 'Успешное получение данных школы'})
    @ApiResponse({status: 400, type: BadRequestResult, description: BadCheckEntitiesException.errorMessage('school','not')})
    @HttpCode(200)
    @Get(':school_id')
    async get(@Param() paramDto: SchoolParamDto) {

        const school = await this.schoolService.getSchoolById(paramDto.school_id);

        this.badException.checkAndGenerateException(!school, 'school','not',['school_id']);

        return school;
    }

    @UseGuards(SearchUserGuard)
    @ApiOperation({summary: 'Добавить школу'})
    @ApiResponse({status: 200, type: School, description: 'Успешное добавление школы'})
    @ApiResponse({status: 400, type: BadRequestResult, description: BadCheckEntitiesException.errorMessage('school', 'yep')})
    @HttpCode(201)
    @Post()
    async create(@Body() schoolDto: SchoolCreateDto, @Req() req) {

        const school = await this.schoolService.getSchoolByParam(schoolDto);
        const user = await this.userService.getById(req.user.id);

        this.badException.checkAndGenerateException(school, 'school', 'yep',['name', 'city', 'street' ,'homeNumber']);
        this.badException.checkAndGenerateException(user.school_id, 'school', 'yep',['school_id']);

        return this.schoolService.createSchool(req.user.id, schoolDto);
    }

    @ApiOperation({summary: 'Изменить данные школы'})
    @ApiResponse({status: 200, type: School, description: 'Успешное изменение данных школы'})
    @ApiResponse({status: 400, type: BadRequestResult, description: BadCheckEntitiesException.errorMessage('school','not')})
    @HttpCode(200)
    @Put(':school_id')
    async update(@Param() paramDto: SchoolParamDto, @Body() schoolDto: SchoolUpdateDto) {

        const school = await this.schoolService.getSchoolById(paramDto.school_id);

        this.badException.checkAndGenerateException(!school, 'school','not',['school_id']);

        return this.schoolService.updateSchool(paramDto.school_id, schoolDto);
    }

    @ApiOperation({summary: 'Удалить школу'})
    @ApiResponse({status: 200, type: SchoolDeleteResponseDto, description: 'Успешное удаление школы'})
    @ApiResponse({status: 400, type: BadRequestResult, description: BadCheckEntitiesException.errorMessage('school','not')})
    @HttpCode(200)
    @Delete(':school_id')
    async remove(@Param() paramDto: SchoolParamDto) {

        const school = await this.schoolService.getSchoolById(paramDto.school_id);

        this.badException.checkAndGenerateException(!school, 'school','not',['school_id']);

        return this.schoolService.removeSchool(paramDto.school_id);
    }
}
