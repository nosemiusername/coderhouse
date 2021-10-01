import { CartDao } from "../dao/cartDao.js";
import { error } from "../config/logger.js"
export class CartController {
    static async add(req, res, next) {
        if (req.isAuthenticated()) {

            try {
                const { username, productId, productName, price, image, quantity } = req.body;
                const createdCart = await CartDao.updateCart(username, productId, quantity, productName, price, image);
                res.redirect('/productos');
            } catch (err) {
                error(err, true);
            }
        } else {
            const __dirname = process.cwd();
            res.sendFile(`${__dirname}/src/public/login.html`);
        }

    }

    static async search(req, res, next) {
        if (req.isAuthenticated()) {
            try {
                const { username } = req.user;
                const items = await CartDao.getAllItems(username);
                res.render('cart.ejs', { user: req.user, products: items })
            } catch (err) {
                error(err, true);
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
                error(err, true);
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
                error(err, true);
            }
        } else {
            const __dirname = process.cwd();
            res.sendFile(`${__dirname}/src/public/login.html`);
        }
    }

    static async updateCart(req, res, next) {
        if (req.isAuthenticated()) {
            try {
                const { username, quantity } = req.body;
                const { productId } = req.params;
                const createdCart = await CartDao.updateCart(username, productId, -quantity);
                res.redirect('/carrito');
            } catch (err) {
                error(err, true);
            }
        } else {
            const __dirname = process.cwd();
            res.sendFile(`${__dirname}/src/public/login.html`);
        }
    }

}