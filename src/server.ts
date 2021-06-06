import {
  bold,
  cyan,
  green,
  yellow,
} from "https://deno.land/std@0.96.0/fmt/colors.ts";
import { Application, Router } from "https://deno.land/x/oak@v7.5.0/mod.ts";

const app = new Application();
const ryobiRouter = new Router({ prefix: "ryobi" });

ryobiRouter
  .post("/login", async (ctx) => {
    const result = ctx.request.body();
    if (result.type === "json") {
      const value = await result.value;
      console.log(value);
      ctx.response.status = 200;
    }
  })
  .get("/", (context) => {
    context.response.body = "Hello World!";
  });

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(
    `${green(ctx.request.method)} ${cyan(ctx.request.url.pathname)} - ${
      bold(String(rt))
    }`,
  );
});

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

const router = new Router().use(
  ryobiRouter.routes(),
  ryobiRouter.allowedMethods(),
);

app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("listen", ({ hostname, port, serverType }) => {
  console.log(
    bold("Start listening on ") + yellow(`${hostname}:${port}`),
  );
  console.log(bold("  using HTTP server: ") + yellow(serverType));
});

await app.listen({ hostname: "127.0.0.1", port: 8000 });
console.log(bold("Finished."));
