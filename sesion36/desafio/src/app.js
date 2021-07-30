import express from 'express';
import { webRouter } from './routes/webRouter.js'
import config from './config/index.js';
import { load } from './loader/index.js';
import { info } from './config/logger.js'
import session from 'express-session';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
import passport from 'passport';

load();
const app = express();

app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./src/public'));
app.use(cookieParser());
app.use(session({
    store: MongoStore.create({ mongoUrl: config.mongo_uri }),
    secret: 'coderhouse',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: Number(config.mongo_max_age),
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', webRouter);

app.listen(config.port, () => {
    info(`Application on port ${config.port}`);
});
