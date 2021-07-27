import config from "../config/index.js";
import { fork } from "child_process";
import { sendMail, sendSMS } from '../helper/index.js'

export default class WebController {

    static sendRegister(req, res, next) {
        res.render('register');
    }

    static sendLogin(req, res, next) {
        res.render('login');
    };

    static sendIndex(req, res, next) {
        if (req.isAuthenticated()) {
            const ts = Date.now();
            const date_ob = new Date(ts);
            sendChat(req, res, next);
            sendMail('ethereal', 'login', req.user.displayName, date_ob, req.user.photos[0].value);
            sendMail('gmail', 'login', req.user.displayName, date_ob, req.user.photos[0].value);
        }
        else {
            res.render('login');
        }

    };

    static sendChat(req, res, next) {
        req.user.counter = req.user.counter = 0 || req.user.counter++;
        res.render('chat', {
            name: req.user.displayName,
            photo: req.user.photos[0].value,
            email: req.user.emails[0].value,
            contador: req.user.counter
        });
    }

    static sendLogout(req, res, next) {
        sendMail('ethereal', 'logout', req.user.displayName, date_ob, req.user.photos[0].value);
        sendMail('gmail', 'logout', req.user.displayName, date_ob, req.user.photos[0].value);
        req.logout();
        res.render('login');
    }

    static sendFailRegister(req, res, next) {
        res.render('register-error', {});
    }

    static sendFailLogin(req, res, next) {
        res.render('login-error', {});
    }

    static fbErrorHandler(err, req, res, next) {
        req.flash('error', err);
        res.render('login-error', { err });
    }

}


