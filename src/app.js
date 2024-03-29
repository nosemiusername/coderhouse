import express from 'express';
import { Server as httpServer } from 'http';
import { WebRouter } from './routes/webRouter.js';
import { ItemRouter } from './routes/itemRouter.js';
import config from './config/index.js';
import { load } from './loader/index.js';
import { info, error } from './config/logger.js'
import session from 'express-session';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import handlebars from 'express-handlebars'
import cluster from 'cluster';
import os from 'os';

// Code to run if we're in the master process
if (cluster.isMaster) {

    // Count the machine's CPUs
    const cpuCount = config.cluster_mode === "true" ? os.cpus().length : 1;

    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }

    cluster.on('error', (err) => {
        error(err);
    })

    // Listen for terminating workers
    cluster.on('exit', function (worker) {

        // Replace the terminated workers
        console.log('Worker ' + worker.id + ' died :(');
        cluster.fork();

    });

    // Code to run if we're in a worker process
} else {

    const __dirname = process.cwd();
    const app = express();
    const http = new httpServer(app);

    load(http);

    app.engine(
        'hbs',
        handlebars({
            extname: '.hbs',
            defaultLayout: 'main.hbs',
            layoutsDir: __dirname + '/src/views/layouts',
        }
        )
    );

    app.set('view engine', 'hbs');
    app.set('view engine', 'ejs');
    app.set('view engine', 'pug');
    app.set('views', './src/views');
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('./src/public'));
    app.use(cookieParser());
    app.use(session({
        store: config.env == 'production' ? MongoStore.create({ mongoUrl: config.mongo_uri }) : "",
        secret: 'coderhouse',
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: Number(config.mongo_max_age),
        }
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    const itemRouter = new ItemRouter();
    const webRouter = new WebRouter();
    app.use('/', webRouter.start());
    app.use('/api/productos', itemRouter.start());

    http.listen(config.port, () => {
        info(`Application on port ${config.port}`);
    });
}