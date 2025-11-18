import MyContext from "../types/MyContext";

const buy_ton = (ctx: MyContext) => {
  ctx.session.commandBuyTon = true;
  return ctx
    .answerCbQuery()
    .then(() => ctx.reply("<b>Назовите число</b>", { parse_mode: "HTML" }));
};
export default buy_ton;
