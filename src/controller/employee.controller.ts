import {Body, Controller, Get, Param, Post, UseGuards, UsePipes} from '@nestjs/common';
import {EmployeeService} from "../service/employee.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Employee} from "../model/employee.model";
import {CreateEmployeeDto} from "../dto/create-employee.dto";
import {JwtAdminAuthGuard} from "../guard/jwt-admin-auth.guard";
import {ValidationBody} from "../pipes/valdationBody.pipe";

@ApiTags('Сотрудники')
@Controller('employee')
export class EmployeeController {

    constructor(private employeeService: EmployeeService) { }

    @ApiOperation({summary: 'Получение списка сотрудников'})
    @ApiResponse({status: 200,type: [Employee]})
    @Get()
    getAll() {
        return this.employeeService.getAllEmployee();
    }

    @ApiOperation({summary: 'Получить данные сотрудника по '})
    @ApiResponse({status: 200,type: Employee})
    @Get('/:email')
    getEmployeeByEmail(@Param('email') email: string) {
        return this.employeeService.getEmployeeByEmail(email);
    }

    @ApiOperation({summary: 'Создание сотрудника'})
    @ApiResponse({status: 200,type: Employee})
    @UsePipes(ValidationBody)
    @Post()
    create(@Body() employeeDto: CreateEmployeeDto) {
        
        return this.employeeService.createEmployee(employeeDto);
    }
}
