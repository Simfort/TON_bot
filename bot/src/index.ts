import { session, Telegraf } from "telegraf";
import { config } from "dotenv";
config();

const bot = new Telegraf(process.env.BOT_TOKEN!);

bot.use(session());

bot.start((ctx) =>
  ctx.reply(
    "Привет! Я — ваш помощник в мире лекарств и здоровья. Помогу найти нужное средство, сравнить цены в аптеках вашего города и оформить заказ. Всё в одном чате — просто напишите название препарата!"
  )
);
bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
