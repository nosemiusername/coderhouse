import express from 'express';
import compression from 'compression';
import dotenv from 'dotenv';
import log4js from 'log4js';

const categories = {

}
const NODE_ENV = process.env.NODE_ENV; \
const app = express();
const loggerConsola = log4js.getLogger("todos");

app.use(express.json());
app.get('/sumar', (req, res) => {
    const { num1, num2 } = req.query;
    res.send(salud);
    loggerConsola.warn("todo ok");
})

app.listen(8000, () => { console.log("Aqui") });