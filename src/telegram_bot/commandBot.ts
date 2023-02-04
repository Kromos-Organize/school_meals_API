
export const CommandBot = {
    requestCreateDev: {
        cancel: 'Отменить',
        await: 'Ожидание',
        success: 'Подтвердить'
    }
    // main:{ showTimeWork:'Время работы',showSchedule:'График работы',calendars:'Календари', articles: 'Статьи',refresh: 'Перерождение'},
    // timeWork:{setTime: 'Сохрани время работы', editTime:'Изменить дополнительное время',
    //     getTime: 'Время за текущий месяц', getTimeYear:'Время в этом году' ,getTimeAll: 'Все время работы'},
    // schedule:{getScheduleWeek: 'Текущая неделя',getScheduleMonth: 'Текущий месяц'},
    // articles: {getListArticles: 'Показать ссылки' ,saveLinkArticles: 'Сохранить ссылку'},
    // generic:{cancel:"Назад"}
}

async function checkCommand(text: string) {

    let result;

    for (let command in CommandBot) {
        for (let comm in CommandBot[command]) {

            if (text === CommandBot[command][comm] || text === '/start') {
                result = 'command'
            }
        }
    }
    return result ? 'command' : `Извините, я не знаю такой команды.`
}

