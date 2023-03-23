import {Controller, Get, HttpCode, Query} from "@nestjs/common";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {LogsService} from "../application/logs.service";
import {BadRequestResult} from "../../helpers/exception/badRequestResult";
import {BadCheckEntitiesException} from "../../helpers/exception/BadCheckEntitiesException";

@ApiTags('Логи запросов')
@Controller('logs')
export class LogsController {
    constructor(private logsService: LogsService,
                private badException: BadCheckEntitiesException
                ) {
    }

    @ApiOperation({summary: 'Получение списка логов'})
    @ApiResponse({status: 200, type: '', description: 'Успешное получение списка логов'})
    @HttpCode(200)
    @Get()
    async getAllLogs() {

        return await this.logsService.getAll()
    }

    @ApiOperation({summary: 'Получение лога по имени файла'})
    @ApiResponse({status: 200, type: '', description: 'Успешное получение файла логов'})
    @ApiResponse({status: 400, type: BadRequestResult, description: BadCheckEntitiesException.errorMessage('logs', 'not')})
    @HttpCode(200)
    @Get('/log')
    async getDailyLog(@Query('fileName') fileName: string) {

        const logfile = await this.logsService.getSpecificLog(fileName)

        this.badException.checkAndGenerateException(!logfile, 'logs', 'not', ['fileName']);

        return logfile
    }
}