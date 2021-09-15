// import { Router, Application } from "./deps2.ts"
import { Application, Router } from "https://deno.land/x/oak/mod.ts";

import Product from "./controller/product.ts";

const port = 8080;
const product = new Product();

const router = new Router();
router
    .get("/api/products", (ctx) => {
        ctx.response.body = product.getAll();
    })
    .post("/api/products", (ctx) => {
        ctx.response.body = product.add(ctx.request.body());
    });
const app = new Application();
console.log(`app listen `);

app.use(router.routes());
app.use(router.allowedMethods());
const server = await app.listen({ port: 8080 });
console.log(`app listen ${port}`);
