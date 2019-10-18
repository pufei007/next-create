const Koa = require("koa");
const Router = require("koa-router");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
console.log('5555：'+process.env.PORT)
const PORT = process.env.PORT || 3700;

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();

  router.get("/a/:id", async ctx => {
    const id = ctx.query.id;
    await handle(ctx.req, ctx.res, {
      pathname: "/a",
      query: { id }
    });
    ctx.respond = false;
  });
  server.use(router.routes());
  server.use(async (ctx, next) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  server.listen(PORT, () => {
    console.log(`next-create server is running at http://localhost:${PORT}`);
  });
});
