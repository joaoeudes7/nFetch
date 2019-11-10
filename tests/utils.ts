import * as Koa from 'koa';
import * as Router from 'koa-router';

export function initServeTest() {
  const app = new Koa();
  const router = new Router();

  // Configs
  const HOST = 'localhost';
  const HTTP_PORT = 3000;

  router
    // Methods
    .get("/", sendMethod)
    .post("/", sendMethod)
    .put("/", sendMethod)
    .delete("/", sendMethod)

    // Body Test
    .post("/body", sendBody)
    .put("/body", sendBody)
    .delete("/body", sendBody)

  app.listen(HTTP_PORT, HOST)

  app
  .use(router.allowedMethods())
  .use(router.routes())

  return app;
}

export function initServerBody() {

}

const sendMethod = async (ctx: any) => ctx.body = { method: ctx.method };
const sendBody = async (ctx: any) => console.log(ctx.request);
