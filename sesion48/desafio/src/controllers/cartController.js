import { CartDao } from "../dao/cartDao.js";
import { error } from "../config/logger.js"
export class CartController {
    static async add(req, res, next) {
        const { username, productId, productName, price, image, quantity } = req.body;
        const createdCart = await CartDao.updateCart(username, productId, productName, price, image, quantity);
        // res.status(createdCart.status).json(createdCart);
        res.redirect('/productos');
    }

    static async search(req, res, next) {
        if (req.isAuthenticated()) {
            try {
                const { username } = req.user;
                const items = await CartDao.getAllItems(username);
                res.render('cart.ejs', { user: req.user, products: items })
            } catch (error) {
                res.redirect('/productos');
            }
        } else {
            res.sendFile(`${__dirname}/src/public/login.html`);
        }
    }

    static async pay(req, res, next) {
        if (req.isAuthenticated()) {
            try {
                await CartDao.changeStatus(req.user);
            } catch (err) {
                error(error);
            } finally {
                res.redirect('/productos');
            }
        } else {
            res.sendFile(`${__dirname}/src/public/login.html`);
        }

    }

    static async remove(req, res, next) {
        if (req.isAuthenticated()) {
            try {
                await CartDao.deleteCart(req.user);
            } catch (err) {
                error(error);
            } finally {
                res.redirect('/productos');
            }
        } else {
            res.sendFile(`${__dirname}/src/public/login.html`);
        }

    }

}