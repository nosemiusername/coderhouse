import express from 'express';
import { Server as httpServer } from 'http';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
import config from './config/index.js';
import { itemRoute } from './router/item.routes.js';
import { webRoute } from './router/webRoute.js';
import { load } from './loader/index.js';
import passport from 'passport';

const app = express();
const http = new httpServer(app);
const PORT = config.port;
await load(http);

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());
app.use(session({
    store: MongoStore.create({mongoUrl:config.mongoURI}),
    secret: 'coderhouse',
    resave: false,
    saveUninitialized: true,
    cookie:{ 
        maxAge:Number(config.mongoMaxAge),
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/api', itemRoute);
app.use('', webRoute);

http.listen(PORT, () => {
    console.log(`Application is listening at port ${PORT}`)
});
