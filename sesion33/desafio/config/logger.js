const pino = require('pino');

const loggerWarn = pino({
    prettyPrint: {
        colorize: true,
        levelFirst: true,
        translateTime: "yyyy-dd-mm, h:MM:ss TT",
    },
}, pino.destination("/tmp/warn.log"));

const loggerError = pino({
    prettyPrint: {
        colorize: true,
        levelFirst: true,
        translateTime: "yyyy-dd-mm, h:MM:ss TT",
    },
}, pino.destination("/tmp/error.log"));

const loggerConsole = pino({
    prettyPrint: {
        colorize: true,
        levelFirst: true,
        translateTime: "yyyy-dd-mm, h:MM:ss TT",
    },
}, pino.destination());

loggerWarn.level = 'warn';
loggerError.level = 'error';
loggerConsole.level = 'info';

const info = (msg) => {
    loggerConsole.info(msg);
}

const warn = (msg) => {
    loggerWarn.warn(msg);
    loggerConsole.warn(msg);
}

const error = (msg) => {
    loggerError.error(msg);
    loggerConsole.error(msg);
}

module.exports = { info, warn, error }