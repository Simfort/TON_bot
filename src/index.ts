import { Context, Markup, session, Telegraf } from "telegraf";
import { config } from "dotenv";
import stats from "./commands/stats";
import MyContext from "./types/MyContext";
import buy_ton from "./commands/buy_ton";
import say_count from "./commands/say_count";
config();

const bot = new Telegraf(process.env.BOT_TOKEN!);
bot.use(
  session({
    defaultSession: () => ({
      health: 0,
      stars: 0,
      spent_stars: 0,
      commandBuyTon: false,
    }),
  })
);

bot.start((ctx) =>
  ctx.reply(
    "Бот позволяет пользователям обменивать звёзды Telegram (Telegram Stars) на криптовалюту Toncoin (TON). Это удобный способ конвертировать внутреннюю валюту Telegram в реальный цифровой актив без необходимости выходить из мессенджера..",
    Markup.inlineKeyboard([
      Markup.button.callback("Купить TON", "buy_ton"),
      Markup.button.webApp(
        "Открыть приложение",
        "https://www.yandex.ru/search/?text=telegraf+node+js&lr=146&src=suggest_B"
      ),
    ])
  )
);

// commands telegram bot
bot.action("buy_ton", (ctx) => buy_ton(ctx as unknown as MyContext));
bot.on("text", (ctx) => say_count(ctx as unknown as MyContext));
bot.command("stats", (ctx) => stats(ctx as unknown as MyContext));

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
bot.telegram.setWebhook(process.env.VERCEL_URL!);
bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
