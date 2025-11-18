"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const say_count = async (ctx) => {
    if (ctx.session.commandBuyTon) {
        const count = +ctx.message.text;
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
exports.default = say_count;
