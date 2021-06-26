export default class WebController {

    static sendRegister(req, res, next) {
        res.render('register');
    }

    static sendLogin(req, res, next) {
        res.render('login');
    };

    static sendIndex(req, res, next) {
        res.render('chat', { user: req.user });
    };

    static sendLogout(req, res, next) {
        req.logout();
        res.render('login');
    }

    static sendFailRegister(req, res, next){
        res.render('register-error', {});
    }

    static sendFailLogin(req, res, next){
        res.render('login-error', {});
    }
}


