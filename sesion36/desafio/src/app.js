import express from 'express';
import { webRouter } from './routes/webroute.js'
import config from './config/index.js';
import { load } from './loader/index.js';

load();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/', webRouter);


