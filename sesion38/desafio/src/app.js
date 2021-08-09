import express from 'express';
import { webRouter } from './routes/webRouter.js';
import { apiRouter } from './routes/apiRouter.js';
import { root, schemas } from './controllers/itemController.js';
import { graphqlHTTP } from 'express-graphql'
import config from './config/index.js';
import { load } from './loader/index.js';
import { info } from './config/logger.js'
import session from 'express-session';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
import passport from 'passport';
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

    // Listen for terminating workers
    cluster.on('exit', function (worker) {

        // Replace the terminated workers
        console.log('Worker ' + worker.id + ' died :(');
        cluster.fork();

    });

    // Code to run if we're in a worker process
} else {

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
    app.use('/api', apiRouter);
    app.use('/graphql', graphqlHTTP({
        schema: schemas,
        rootValue: root,
        graphiql: true,
    }));

    app.listen(config.port, () => {
        info(`Application on port ${config.port}`);
    });
}