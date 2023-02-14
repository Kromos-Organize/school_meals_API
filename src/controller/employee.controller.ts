import {Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import {EmployeeService} from "../service/employee.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Employee} from "../model/employee.model";
import {CreateEmployeeDto, UpdateEmloyeeDto} from "../dto/create-employee.dto";
import {MessageDto} from "../dto/message.dto";

@ApiTags('Сотрудники школы')
@Controller('employee')
export class EmployeeController {

    constructor(private employeeService: EmployeeService) {
    }

    @ApiOperation({summary: 'Получение списка сотрудников'})
    @ApiResponse({status: 200, type: [Employee]})
    @Get()
    getAll(@Query('school_id') school_id: string) {

        return this.employeeService.getAllEmployee(school_id);
    }

    @ApiOperation({summary: 'Получение данных сотрудника по айди'})
    @ApiResponse({status: 200, type: Employee})
    @Get(':employee_id')
    getById(@Param('employee_id') employee_id: string) {

        return this.employeeService.getEmployeeById(employee_id)
    }

    @ApiOperation({summary: 'Получить данные сотрудника по емейлу'})
    @ApiResponse({status: 200, type: Employee})
    @Get()
    getEmployeeByEmail(@Query('email') email: string) {

        return this.employeeService.getEmployeeByEmail(email);
    }

    @ApiOperation({summary: 'Создание сотрудника'})
    @ApiResponse({status: 201, type: Employee})
    @Post()
    create(@Body() employeeDto: CreateEmployeeDto) {

        return this.employeeService.createEmployee(employeeDto);
    }

    @ApiOperation({summary: 'Изменить данные сотрудника'})
    @ApiResponse({status: 200, type: Employee})
    @Put(':employee_id')
    update(@Param('employee_id') employee_id: string, @Body() employeeDto: UpdateEmloyeeDto) {

        return this.employeeService.updateEmployee(employee_id, employeeDto);
    }

    @ApiOperation({summary: 'Удалить сотрудника'})
    @ApiResponse({status: 200, type: MessageDto})
    @Delete(':employee_id')
    remove(@Param('employee_id') employee_id: string) {

        return this.employeeService.removeEmployee(employee_id);
    }
}
