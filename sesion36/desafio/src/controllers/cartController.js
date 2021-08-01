import { CartService } from "../services/cartService.js";

export class CartController {
    static async add(req, res, next) {
        const { username, productId, productName, price, image, quantity } = req.body;
        const createdCart = await CartService.updateCart(username, productId, productName, price, image, quantity);
        // res.status(createdCart.status).json(createdCart);
        res.redirect('/home');
    }

    static async search(req, res, next) {
        if (req.isAuthenticated()) {
            const { username } = req.user;
            const items = await CartService.getAllItems(username);
            res.render('cart', { user: req.user, products: items })
        }
    }

    static async pay(req, res, next) {
        if (req.isAuthenticated()) {
            const { username } = req.user;
            const changeStatus = await CartService.changeStatus(username);
            res.redirect('/home');
        }

    }

}