import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Delete, Get, Param, Post, Put, UsePipes} from "@nestjs/common";
import {ManagerService} from "src/service/manager.service";
import {Employee} from "../model/employee.model";
import {Manager} from "../model/manager.model";
import {ValidationBody} from "../pipes/valdationBody.pipe";
import {CreateManagerDto, UpdateManagerDto} from "../dto/manager.dto";
import {MessageDto} from "../dto/message.dto";

@ApiTags('Менеджеры')
@Controller('manager')
export class ManagerController {

    constructor(private managerService: ManagerService) {
    }

    @ApiOperation({summary: 'Получение списка менеджеров'})
    @ApiResponse({status: 200, type: [Manager]})
    @Get()
    getAll() {
        return this.managerService.getAll();
    }

    @ApiOperation({summary: 'Получение данных менеджера по емейлу'})
    @ApiResponse({status: 200, type: Manager})
    @Get(':email')
    get(@Param('email') email: string) {
        return this.managerService.getByEmail(email);
    }

    @ApiOperation({summary: 'Создание менеджера'})
    @ApiResponse({status: 200, type: Manager})
    @UsePipes(ValidationBody)
    @Post()
    create(@Body() managerDto: CreateManagerDto) {

        return this.managerService.createManager(managerDto);
    }

    @ApiOperation({summary: 'Изменение данных менеджера'})
    @ApiResponse({status: 200, type: Manager})
    @Put(':manager_id')
    update(@Param('manager_id') manager_id: string, @Body() managerDto: UpdateManagerDto) {

        return this.managerService.updateManager(manager_id, managerDto);
    }

    @ApiOperation({summary: 'Удаление менеджера'})
    @ApiResponse({status: 200, type: MessageDto})
    @Delete(':manager_id')
    remove(@Param('manager_id') manager_id: string) {

        return this.managerService.removeManager(manager_id)
    }
}