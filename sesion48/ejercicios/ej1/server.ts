import { expressive } from "./deps.ts"
import Product from "./controller/product.ts";

const port = 8080;
const app = new expressive.App();
const product = new Product();

app.use(expressive.simpleLog());
app.use(expressive.bodyParser.json());


app.get("/api/productos", async (request: any, response: any) => {
    await response.json(product.getAll());
})

app.post("/api/productos", async (request: any, response: any) => {
    await response.json(product.add(request.data));
})

const server = await app.listen(port);
console.log(`app listen ${port}`);
