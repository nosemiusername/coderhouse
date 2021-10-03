import { CartDaoMongo } from "../dao/cartDao.mongo.js";
import { error } from "../config/logger.js"
export class CartController {

    /**
     * Factory. If needed other database, just add in enviroment, dao, and de clause over if
     * @param {string} config  
     *      database type
     */
    constructor(config) {
        if (config == "Mongo") {
            this.cartDao = new CartDaoMongo();
        }
    }

    add = async (req, res, next) => {
        if (req.isAuthenticated()) {

            try {
                const { email, productId, productName, price, image, quantity } = req.body;
                const createdCart = await this.cartDao.updateCart(email, productId, quantity, false, productName, price, image);
                res.redirect('/productos');
            } catch (err) {
                error(err, res);
            }
        } else {
            const __dirname = process.cwd();
            res.sendFile(`${__dirname}/src/public/login.html`);
        }

    }

    search = async (req, res, next) => {
        if (req.isAuthenticated()) {
            try {
                const { email } = req.user;
                const items = await this.cartDao.getAllItems(email);
                res.render('cart.ejs', { user: req.user, products: items })
            } catch (err) {
                error(err, res);
            }
        } else {
            const __dirname = process.cwd();
            res.sendFile(`${__dirname}/src/public/login.html`);
        }
    }

    pay = async (req, res, next) => {
        if (req.isAuthenticated()) {
            try {
                await this.cartDao.changeStatus(req.user);
                res.redirect('/productos');
            } catch (err) {
                error(err, res);
            }
        } else {
            const __dirname = process.cwd();
            res.sendFile(`${__dirname}/src/public/login.html`);
        }

    }

    remove = async (req, res, next) => {
        if (req.isAuthenticated()) {
            try {
                await this.cartDao.deleteCart(req.user);
                res.redirect('/productos');
            } catch (err) {
                error(err, res);
            }
        } else {
            const __dirname = process.cwd();
            res.sendFile(`${__dirname}/src/public/login.html`);
        }
    }

    updateCart = async (req, res, next) => {
        if (req.isAuthenticated()) {
            try {
                const { email, quantity } = req.body;
                const { productId } = req.params;
                const createdCart = await this.cartDao.updateCart(email, productId, quantity, true);
                res.redirect('/carrito');
            } catch (err) {
                error(err, res);
            }
        } else {
            const __dirname = process.cwd();
            res.sendFile(`${__dirname}/src/public/login.html`);
        }
    }

}