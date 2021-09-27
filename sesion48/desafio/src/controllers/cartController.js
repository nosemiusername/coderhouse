import { CartService } from "../services/cartService.js";
import { error } from "../config/logger.js"
export class CartController {
    static async add(req, res, next) {
        const { username, productId, productName, price, image, quantity } = req.body;
        const createdCart = await CartService.updateCart(username, productId, productName, price, image, quantity);
        // res.status(createdCart.status).json(createdCart);
        res.redirect('/home');
    }

    static async search(req, res, next) {
        if (req.isAuthenticated()) {
            try {
                const { username } = req.user;
                const items = await CartService.getAllItems(username);
                res.render('cart.ejs', { user: req.user, products: items })
            } catch (error) {
                res.redirect('/home');
            }

        }
    }

    static async pay(req, res, next) {
        if (req.isAuthenticated()) {
            try {
                await CartService.changeStatus(req.user);
            } catch (err) {
                error(error);
            } finally {
                res.redirect('/home');
            }
        }

    }

}