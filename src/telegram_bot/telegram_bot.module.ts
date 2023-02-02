import {Module} from '@nestjs/common';
import {TelegramBotService} from './telegram_bot.service';
import {TelegramBotController} from './telegram_bot.controller';

@Module({
    providers: [TelegramBotService],
    controllers: [TelegramBotController],
    imports:[
        // AdminModule
    ],
    exports: [
        TelegramBotService
    ]
})
export class TelegramBotModule { }
