import express from 'express';
import { itemRoute } from './router/item.routes.js';
import config from './config/index.js';
import { loader } from './loaders/index.js';

async function startServer() {
    await loader();
    const app = express();
    const PORT = config.port;
    app.use(express.json());
    app.use('/api', itemRoute);
    app.listen(PORT, () => {
        console.log(`Application is listening at port ${PORT}`)
    });

}

startServer();