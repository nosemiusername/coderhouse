import config from '../config/index.js';


export default class WebController {

    static sendRegister(req, res, next) {
        res.render('register');
    }

    static sendLogin(req, res, next) {
        res.render('login');
    };

    static sendIndex(req, res, next) {
        res.render('chat', { user: req.session.user });
    };

    static sendLogout(req, res, next) {
        req.session.destroy();
        res.render('login');
    }

    static sendFailRegister(req, res, next){
        res.render('register-error', {});
    }

    static sendFailLogin(req, res, next){
        res.render('register-error', {});
    }
}


