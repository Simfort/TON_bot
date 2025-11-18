"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const dotenv_1 = require("dotenv");
const stats_1 = __importDefault(require("./commands/stats"));
const buy_ton_1 = __importDefault(require("./commands/buy_ton"));
const say_count_1 = __importDefault(require("./commands/say_count"));
(0, dotenv_1.config)();
const bot = new telegraf_1.Telegraf(process.env.BOT_TOKEN);
bot.use((0, telegraf_1.session)({
    defaultSession: () => ({
        health: 0,
        stars: 0,
        spent_stars: 0,
        commandBuyTon: false,
    }),
}));
bot.start((ctx) => ctx.reply("Бот позволяет пользователям обменивать звёзды Telegram (Telegram Stars) на криптовалюту Toncoin (TON). Это удобный способ конвертировать внутреннюю валюту Telegram в реальный цифровой актив без необходимости выходить из мессенджера..", telegraf_1.Markup.inlineKeyboard([
    telegraf_1.Markup.button.callback("Купить TON", "buy_ton"),
    telegraf_1.Markup.button.webApp("Открыть приложение", "https://www.yandex.ru/search/?text=telegraf+node+js&lr=146&src=suggest_B"),
])));
// commands telegram bot
bot.action("buy_ton", (ctx) => (0, buy_ton_1.default)(ctx));
bot.on("text", (ctx) => (0, say_count_1.default)(ctx));
bot.command("stats", (ctx) => (0, stats_1.default)(ctx));
bot.on("pre_checkout_query", async (ctx) => {
    // Здесь можно проверить, доступен ли товар
    await ctx.answerPreCheckoutQuery(true); // Подтверждаем оплату
});
bot.on("successful_payment", async (ctx) => {
    const payment = ctx.update.message.successful_payment;
    console.log(`Получено ${payment.total_amount} звёзд`);
    await ctx.reply("Спасибо за покупку!");
});
//----------------------
bot.launch();
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
