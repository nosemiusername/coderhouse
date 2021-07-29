import express from 'express';
import { webRouter } from './routes/webroute.js'
import config from './config/index.js';
import { load } from './loader/index.js';
import { info } from './config/logger.js'
import passport from 'passport';


load();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', webRouter);

app.listen(config.port, () => {
    info(`Application on port ${config.port}`);
});
