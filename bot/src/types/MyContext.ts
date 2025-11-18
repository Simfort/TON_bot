import { Context } from "telegraf";

export type MySession = {
  health: number;
  stars: number;
  spent_stars: number;
  commandBuyTon: boolean;
};

export default interface MyContext extends Context {
  session: MySession;
}
