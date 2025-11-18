import MyContext from "../types/MyContext";

const say_count = async (ctx: MyContext) => {
  if (ctx.session.commandBuyTon) {
    const count = +ctx.message!.text;
    ctx.session.commandBuyTon = false;
    return await ctx.replyWithInvoice({
      title: count + " TON",
      description: `Купить ${count} TON`,
      payload: "test",
      provider_token: "",
      currency: "XTR",
      prices: [
        {
          label: "TON",
          amount: +((3.16 * count) / 0.013).toFixed(0),
        },
      ],
    });
  }
};
export default say_count;
