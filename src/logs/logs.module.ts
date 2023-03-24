import {Module} from "@nestjs/common";
import {LogsService} from "./application/logs.service";
import {LogsController} from "./api/logs.controller";
import {BadCheckEntitiesException} from "../helpers/exception/BadCheckEntitiesException";
import {PassportModule} from "@nestjs/passport";

@Module({
    providers: [
        LogsService,
        BadCheckEntitiesException
    ],
    controllers: [LogsController],
    imports: [PassportModule.register({ defaultStrategy: 'jwt' }) ],
    exports: []
})
export class LogsModule {}