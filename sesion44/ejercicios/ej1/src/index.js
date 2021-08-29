import express from "express";
import WebRouter from "./router/webRouter.js";
const app = express();
const PORT = 3000;
const webRouter = new WebRouter();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', webRouter.start());

app.listen(PORT, () => {
    console.log(`Application is listening at port ${PORT}`)
});