const Koa = require("koa");
const app = new Koa();
const path = require("path");
const serve = require("koa-static");
const logger = require("koa-logger");
const route = require("koa-route");
const compress = require("koa-compress");
const user = require("./controllers/user");
const client = require("prom-client");

const register = new client.Registry();

register.setDefaultLabels({
  app: "example-nodejs-app",
});

client.collectDefaultMetrics({ register });

const PORT = 3000
if (isNaN(PORT)) {
  throw new Error("PORT is not defined or wrong.");
}

app.use(logger());

app.use(
  route.get("/metrics", async (ctx, next) => {
    if ("GET" != ctx.method) return next;

    ctx.set("Content-Type", register.contentType);
    ctx.body = await register.metrics();
  })
);
app.use(route.get("/api/users/:id", user.get));

app.use(serve(path.join(__dirname, "/static")));
app.use(compress());

const listener = app.listen(PORT);
listener.on("listening", () => {
  console.log(`Listening on ${PORT}`);
});