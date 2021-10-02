import { ItemController } from "./itemController.js";
import { MessageController } from "./messageController.js";
import config from "../config/index.js";
import { error } from "../config/logger.js";

const __dirname = process.cwd();
export class WebController {

    constructor() {
        this.itemController = new ItemController(config.flagDB);
    }

    sendLogout = (req, res, next) => {
        const ts = Date.now();
        const date_ob = new Date(ts);
        sendMail('ethereal', 'logout', req.user.displayName, date_ob, req.user.photos[0].value);
        sendMail('gmail', 'logout', req.user.displayName, date_ob, req.user.photos[0].value);
        req.logout();
        res.render('login.ejs');
    }

    sendProductos = async (req, res, next) => {
        if (req.isAuthenticated()) {
            const { id } = req.params;
            const items = id == null ? await this.itemController.getAll() : await this.itemController.get(id);
            res.render('productos.ejs', { user: req.user, products: items });
        } else {
            res.sendFile(`${__dirname}/src/public/login.html`);
        }
    }

    sendProfile = async (req, res, next) => {
        if (req.isAuthenticated()) {
            res.render('profile.ejs', { user: req.user });
        } else {
            res.sendFile(`${__dirname}/src/public/login.html`);
        }
    }

    sendInfo = async (req, res, next) => {
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

    enviroment = async (req, res, next) => {
        const annonymConf = { ...config, mongo_uri: "***", gmail_pass: "***", gmail_user: "***" }
        res.render('enviroment.hbs', { enviroments: annonymConf });
    }

    chat = async (req, res, next) => {
        if (req.isAuthenticated()) {
            const { email } = req.params;
            if (email) {
                const messageController = new MessageController(config.flagDB);
                const chats = await messageController.getChatsByUser(email);
                res.render('mychat.hbs', { user: req.user, chats: chats });
            } else {
                res.render('chat.hbs', { user: req.user });
            }
        } else {
            res.sendFile(`${__dirname}/src/public/login.html`);
        }
    }

    failLogin = (req, res, next) => {
        const error = {
            status: 401,
            message: "Unauthorized"
        };
        res.render('error.ejs', { error: error });
    }

    failRegister = (req, res, next) => {
        const error = {
            status: 500,
            message: "Fail register"
        };
        res.render('error.ejs', { error: error });
    }

    sendIndex = (req, res, next) => {
        res.sendFile(`${__dirname}/src/public/login.html`);
    }

    logout = async (req, res, next) => {
        req.logout();
        try {
            await req.session.destroy();
            res.clearCookie('connect.sid');
            res.redirect('/');
        } catch {
            error(err, res);
        }
    }

}
