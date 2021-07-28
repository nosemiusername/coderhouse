import pino, { destination } from 'pino';

const loggerWarn = pino({
    prettyPrint: {
        colorize: true,
        levelFirst: true,
        translateTime: "yyyy-dd-mm, h:MM:ss TT",
    },
}, destination("/tmp/warn.log"));

const loggerError = pino({
    prettyPrint: {
        colorize: true,
        levelFirst: true,
        translateTime: "yyyy-dd-mm, h:MM:ss TT",
    },
}, destination("/tmp/error.log"));

const loggerConsole = pino({
    prettyPrint: {
        colorize: true,
        levelFirst: true,
        translateTime: "yyyy-dd-mm, h:MM:ss TT",
    },
}, destination());

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

export default { info, warn, error }