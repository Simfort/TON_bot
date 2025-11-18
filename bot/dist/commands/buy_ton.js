"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const buy_ton = (ctx) => {
    ctx.session.commandBuyTon = true;
    return ctx
        .answerCbQuery()
        .then(() => ctx.reply("<b>Назовите число</b>", { parse_mode: "HTML" }));
};
exports.default = buy_ton;
