import {Injectable} from '@nestjs/common';
import * as telegramApi from 'node-telegram-bot-api';

@Injectable()
export class TelegramBotService {

    // constructor(private superAdminService: SuperAdminService) { }

    private bot;
    private chatId:0;
    private isPassSuccess: false

    connectBot() {
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

            this.events();

        }catch (e) {
            console.log('нет конекта с ботом')
        }
    }

    events() {

        this.bot.onText(/\/start/,async (msg) => {

            try {
                this.chatId = msg.chat.id;

                await this.bot.sendMessage(this.chatId, 'Приветствую.')
            } catch (e) {
                console.log(e)
            }
        })

        this.bot.on("polling_error", (err) => console.log(err));

        this.bot.on('message', async (msg) => {



            try {

                if (msg.chat.text.incledes('Пароль:') && !this.isPassSuccess) {

                    const pass = msg.chat.text.split(':')[1];

                    if (pass === process.env.ADMIN_PASS) {
                            await this.bot.sendMessageUser('пароль правильны')
                        // await this.superAdminService.create();
                    }
                }
            } catch (e) {
                console.log(e)
            }
        })
    }

    async sendMessageUser(message:string) {

        try {

            await this.bot.sendMessage(this.chatId, message)
        } catch (e) {
            console.log(e)
        }
    }
}
