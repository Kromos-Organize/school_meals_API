import {InlineKeyboard, InlineKeyboardButton, Row} from "node-telegram-keyboard-wrapper";
import {Injectable} from "@nestjs/common";
import {CommandBot} from "./commandBot";


@Injectable()
export class InlineKeyBoardService {

    keyBoardRequest = new InlineKeyboard();

    createKBRequest(id: number) {

        return new InlineKeyboard(
            new Row(
            new InlineKeyboardButton(CommandBot.requestCreateDev.cancel, "callback_data", '0'),
            new InlineKeyboardButton(CommandBot.requestCreateDev.await, "callback_data", '1'),
            new InlineKeyboardButton(CommandBot.requestCreateDev.success, "callback_data", `${id}`),
        ))
    }
}