require('dotenv').config()

let count = 0;
const TelegramBot = require('node-telegram-bot-api');
const moment = require('moment');
const token = process.env.TELEGRAM_TOKEN
const chat_id = process.env.CHAT_ID
const bot = new TelegramBot(token, { polling: true });
moment.locale('tr');

bot.onText(/\/echo (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[1];

    bot.sendMessage(chatId, resp.toUpperCase());
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `${~~(Math.random() * 1e6)}`);
});

function test() {
    let now = moment().format('DD-MM-YY');   // 26 Haziran 2020
    bot.sendMessage(chat_id, `sample message for ${count} time at ${now}`)
    count++;
    if (count == 5) {
        clearInterval(this)
    }
}
setInterval(test, 5000);