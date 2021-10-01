import { CartDao } from "../dao/cartDao.mongo.js";
import { error } from "../config/logger.js"
export class CartController {
    static async add(req, res, next) {
        if (req.isAuthenticated()) {

            try {
                const { email, productId, productName, price, image, quantity } = req.body;
                const createdCart = await CartDao.updateCart(email, productId, quantity, false, productName, price, image);
                res.redirect('/productos');
            } catch (err) {
                error(err, res);
            }
        } else {
            const __dirname = process.cwd();
            res.sendFile(`${__dirname}/src/public/login.html`);
        }

    }

    static async search(req, res, next) {
        if (req.isAuthenticated()) {
            try {
                const { email } = req.user;
                const items = await CartDao.getAllItems(email);
                res.render('cart.ejs', { user: req.user, products: items })
            } catch (err) {
                error(err, res);
            }
        } else {
            const __dirname = process.cwd();
            res.sendFile(`${__dirname}/src/public/login.html`);
        }
    }

    static async pay(req, res, next) {
        if (req.isAuthenticated()) {
            try {
                await CartDao.changeStatus(req.user);
                res.redirect('/productos');
            } catch (err) {
                error(err, res);
            }
        } else {
            const __dirname = process.cwd();
            res.sendFile(`${__dirname}/src/public/login.html`);
        }

    }

    static async remove(req, res, next) {
        if (req.isAuthenticated()) {
            try {
                await CartDao.deleteCart(req.user);
                res.redirect('/productos');
            } catch (err) {
                error(err, res);
            }
        } else {
            const __dirname = process.cwd();
            res.sendFile(`${__dirname}/src/public/login.html`);
        }
    }

    static async updateCart(req, res, next) {
        if (req.isAuthenticated()) {
            try {
                const { email, quantity } = req.body;
                const { productId } = req.params;
                const createdCart = await CartDao.updateCart(email, productId, quantity, true);
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