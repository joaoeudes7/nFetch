import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as KoaJson from 'koa-json';

export function initServeTest() {
  const app = new Koa();
  const router = new Router();

  // Configs
  const HOST = 'localhost';
  const HTTP_PORT = 3000;

  router
    .get("/", sendMethod)
    .post("/", sendMethod)
    .put("/", sendMethod)
    .delete("/", sendMethod)

  app.use(router.routes())
  app.use(router.allowedMethods());
  app.use(KoaJson({}));

  app.listen(HTTP_PORT, HOST)

  return { url: `http://${HOST}:${HTTP_PORT}` };
}

const sendMethod = async (ctx: Koa.ParameterizedContext) => ctx.body = ctx.method;
const sendBody = async (ctx: Koa.ParameterizedContext) => ctx.body = ctx.query;
