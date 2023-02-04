import {Injectable} from '@nestjs/common';
import * as telegramApi from 'node-telegram-bot-api';
import {AdminService} from "../admin/admin.service";
import {CreateAdminDto} from "../admin/dto/create-admin.dto";
import {InlineKeyBoardService} from "./keyBoardReques";

@Injectable()
export class TelegramBotService {

    constructor(private adminService: AdminService,
                private keyBoard: InlineKeyBoardService) { }

    private bot;
    private teamLead: CreateAdminDto;
    private tempDto;

    async connectBot() {
        try {
            this.bot = new telegramApi(process.env.BOT_TOKEN, {
                polling: {
                    interval: 400,
                    autoStart: true,
                    params: {
                        timeout: 30
                    }
                }
            });

            this.teamLead = await this.adminService.getAdminByEmail(process.env.TEAM_LEAD_EMAIL);

            this.events();

        }catch (e) {
            console.log('нет конекта с ботом')
        }
    }

    events() {

        this.bot.onText(/\/start/,async (msg) => {

            try {

                await this.bot.sendMessage(msg.chat.id, 'Приветствую.')
            } catch (e) {
                console.log(e)
            }
        })

        this.bot.on("polling_error", (err) => console.log(err));

        this.bot.on('message', async (msg) => {


        })

        this.bot.on("callback_query", async (query) => {
            console.log('query',query)
        });
    }

    async sendMessageTeamLead(message:string) {

        try {

            await this.bot.sendMessage(this.teamLead.chat_number, message)
        } catch (e) {
            console.log(e)
        }
    }

    async sendRequestTeamLead(message:string, json: string) {

        try {

            // const kb = this.keyBoard.createKBRequest(json);
            // await this.bot.sendMessage(this.teamLead.chat_number,message,{reply_markup: kb.getMarkup()})

        } catch (e) {
            console.log(e)
        }
    }
}
