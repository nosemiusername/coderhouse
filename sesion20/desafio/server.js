import express from 'express';
import {itemRoute} from './router/items.js';

const app = express();
const PORT = 8080;
app.use(express.json());
app.use('/api', itemRoute);

//TODO implementar control de errores
app.listen(PORT);