import { ItemController } from "../controllers/itemController.js"
const __dirname = process.cwd();

export class WebController {

    static sendLogout(req, res, next) {
        const ts = Date.now();
        const date_ob = new Date(ts);
        sendMail('ethereal', 'logout', req.user.displayName, date_ob, req.user.photos[0].value);
        sendMail('gmail', 'logout', req.user.displayName, date_ob, req.user.photos[0].value);
        req.logout();
        res.render('login');
    }

    static sendHome(req, res, next) {
        if (req.isAuthenticated()) {
            res.render('home', { user: req.user })
        }
    }

    static failLogin(req, res, next) {
        res.json('faillogin')
    }

    static failRegister(req, res, next) {
        res.json('failregister');
    }

    static sendIndex(req, res, next) {
        res.sendFile(`${__dirname}/src/public/login.html`);
    }

    static generateItems(req, res, next) {
        const cant = req.query.cant || 1;
        ItemController.create(cant);
        res.json('ok');
    }

}
