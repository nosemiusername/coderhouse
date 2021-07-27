import config from "../config/index.js";
import { fork } from "child_process";
export default class WebController {

    static sendRegister(req, res, next) {
        res.render('register');
    }

    static sendLogin(req, res, next) {
        res.render('login');
    };

    static sendIndex(req, res, next) {
        if (req.isAuthenticated()) {
            sendChat(req, res, next);
            sendmail();
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


