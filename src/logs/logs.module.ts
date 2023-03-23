import {Module} from "@nestjs/common";
import {LogsService} from "./application/logs.service";
import {LogsController} from "./api/logs.controller";
import {BadCheckEntitiesException} from "../helpers/exception/BadCheckEntitiesException";

@Module({
    providers: [
        LogsService,
        BadCheckEntitiesException
    ],
    controllers: [LogsController],
    imports: [],
    exports: []
})
export class LogsModule {}