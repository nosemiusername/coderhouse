import { Cart } from '../models/cart.js';
import { error, info } from '../config/logger.js'
import { sendMail } from '../helper/index.js'

export class CartDao {

    static async findOne(username, status = "pending") {
        const cart = await Cart.findOne({ username, status });
        return cart;
    }

    static async updateCart(username, productId, productName, price, image, quantity = 1) {
        try {
            const cart = await this.findOne(username);
            if (!cart) {
                const newCart = await Cart.create({ username, status: "pending" });
                newCart.items.push({ productId, productName, price, image, quantity });
                await newCart.save();
                return ({ status: 201, msg: "Cart created" });
            } else {
                const objectCart = cart.toObject();
                const id = objectCart.items.filter((v) => v.productId == productId);
                if (id.length) {
                    quantity += id[0].quantity;
                    const updateCart = await Cart.findOneAndUpdate({ username, "items._id": id[0]._id },
                        {
                            "$set": {
                                "items.$.quantity": quantity,
                            }
                        });
                } else {
                    cart.items.push({ productId, productName, price, image, quantity });
                    await cart.save();
                }
                return ({ status: 201, msg: "Item added to cart" });
            }
        } catch (err) {
            error(err);
            return ({ status: 500, msg: "Cart error" });
        }
    }

    static async changeStatus(user) {
        try {
            const cart = await this.findOne(user.username);
            if (cart) {
                const updateCart = await Cart.findOneAndUpdate({ username: user.username, status: "pending" },
                    {
                        "$set": {
                            "status": "payed",
                        }
                    });
                const objectCart = cart.toObject();
                await sendMail(user, objectCart.items);
            }
        } catch (err) {
            error(err);
            return ({ status: 500, msg: "Cart error" });
        }
    }

    static async deleteCart(user) {
        try {
            const newCart = await Cart.findOneAndDelete({ username: user.username, status: "pending" });
        } catch (err) {
            error(err);
            return ({ status: 404, msg: "No cart" });
        }
    }

    static async getAllItems(username) {
        const res = await this.findOne(username);
        const cart = res == null ? null : res.toObject();
        if (cart) {
            return cart.items;
        } else {
            return null;
        }
    }
}
