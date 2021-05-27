import express from 'express';
import {itemRoute} from './api/itemController.js';
import config from './config/index.js';

const app = express();
const PORT = config.port;
console.log(config);
app.use(express.json());
app.use('/api', itemRoute);

//TODO implementar control de errores
app.listen(PORT);