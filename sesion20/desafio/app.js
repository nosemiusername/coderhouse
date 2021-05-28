import express from 'express';
import { itemRoute } from './router/item.routes.js';
import config from './config/index.js';
import mongoose from 'mongoose';

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true, useUnifiedTopology: true
}).then(res => console.log(`Connection Succesful ${res}`))
    .catch(err => console.log(`Error in DB connection ${err}`));

const app = express();
const PORT = config.port;
app.use(express.json());
app.use('/api', itemRoute);

//TODO implementar control de errores
app.listen(PORT, () => {
    console.log(`Application is listening at port ${PORT}`)
});