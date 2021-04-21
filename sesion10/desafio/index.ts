import express from 'express';
import { apiRoute } from './apiRoutes'

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use('/api', apiRoute);
app.listen(PORT);
