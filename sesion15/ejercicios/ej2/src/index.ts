import express from 'express';
import {Perimetro} from './clases/Perimetro'
const app = express();
const perimetro:Perimetro = new Perimetro(1,1,2);
app.get('/',(req, res) => {
    res.json(perimetro.calcularCirculo());
});

app.listen(8080);