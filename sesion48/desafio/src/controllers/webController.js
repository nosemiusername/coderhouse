import { ItemController } from "./itemController.js";
import { UserService } from "../services/userService.js";
import config from "../config/index.js";
const __dirname = process.cwd();

export class WebController {

    static sendLogout(req, res, next) {
        const ts = Date.now();
        const date_ob = new Date(ts);
        sendMail('ethereal', 'logout', req.user.displayName, date_ob, req.user.photos[0].value);
        sendMail('gmail', 'logout', req.user.displayName, date_ob, req.user.photos[0].value);
        req.logout();
        res.render('login.ejs');
    }

    static async sendHome(req, res, next) {
        if (req.isAuthenticated()) {
            const itemController = new ItemController(config.flagDB);
            const items = await itemController.getAll();
            res.render('home.ejs', { user: req.user, products: items });
        } else {
            res.sendFile(`${__dirname}/src/public/login.html`);
        }
    }

    static async sendProfile(req, res, next) {
        if (req.isAuthenticated()) {
            res.render('profile.ejs', { user: req.user });
        } else {
            res.sendFile(`${__dirname}/src/public/login.html`);
        }
    }

    static async sendInfo(req, res, next) {
        const data = {
            arg: process.argv,
            platform_name: process.platform,
            node_version: process.version,
            memory_usage: process.memoryUsage().heapUsed,
            path_node: process.execPath,
            pid: process.pid,
            path_execution: process.cwd(),
        }

        res.render('info.pug', { data: data });
    }

    static failLogin(req, res, next) {
        res.json('faillogin');
    }

    static failRegister(req, res, next) {
        res.json('failregister');
    }

    static sendIndex(req, res, next) {
        res.sendFile(`${__dirname}/src/public/login.html`);
    }

}
