import express from 'express';
import { apiRoutes } from './apiRoutes'

const app = express();
const PORT = 3000;


app.use('/api', apiRoutes);
app.listen(PORT);
