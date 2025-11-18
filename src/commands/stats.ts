import MyContext from "../types/MyContext";

const stats = (ctx: MyContext) => {
  const health = ctx.session.health;
  const spent_stars = ctx.session.spent_stars;
  const starts = ctx.session.stars;
  return ctx.reply(
    `
Ваша статистика:
<b>Купленных лекарств</b>: ${health}
<b>Звезд</b>: ${starts}
<b>Отправленно звезд</b>: ${spent_stars}
     `,
    { parse_mode: "HTML" }
  );
};
export default stats;
