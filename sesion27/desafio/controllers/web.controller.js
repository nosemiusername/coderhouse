export default class WebController {

    static sendRegister(req, res, next) {
        res.render('register');
    }

    static sendLogin(req, res, next) {
        res.render('login');
    };

    static sendIndex(req, res, next) {
        if (req.isAuthenticated()) {
            req.user.counter = req.user.counter = 0 || req.user.counter++;
            res.render('chat', {
                name: req.user.displayName,
                photo: req.user.photos[0].value,
                email: req.user.emails[0].value,
                contador: req.user.counter
            });
        } else {
            res.render('login');
        }
    };

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
}


