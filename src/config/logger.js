/** enable error pino based*/
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

export const info = (msg) => {
    loggerConsole.info(msg);
}

export const warn = (msg) => {
    loggerWarn.warn(msg);
    loggerConsole.warn(msg);
}

/** at error if need render error page */
export const error = (msg, res, status = 500) => {
    loggerError.error(msg);
    loggerConsole.error(msg);
    if (res) {
        const err = {
            status: status,
            message: msg
        };
        res.render('error.ejs', { error: err });
    }
}

