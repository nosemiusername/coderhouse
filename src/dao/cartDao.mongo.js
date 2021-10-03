import { Cart } from '../models/cart.mongo.js';
import { Order } from '../models/order.mongo.js';
import { error } from '../config/logger.js'
import CartDao from './carDao.js'
import { sendMail } from '../helper/index.js'
import moment from 'moment';

export class CartDaoMongo extends CartDao {

    constructor() {
        super();
    }

    /**
     * Find cart by email
     * @param {string} email 
     * @param {string} status 
     * @returns Cart
     */
    async findOne(email, status = "pending") {
        const cart = await Cart.findOne({ email, status });
        return cart;
    }

    /**
     * Update feats and amount of item at cart, considering if is add just one more, or updated overall quantity
     * @param {string} email 
     * @param {string} productId 
     * @param {string} quantity 
     * @param {string} discount 
     * @param {string} productName 
     * @param {string} price 
     * @param {string} image 
     * @returns Json(status)
     */
    async updateCart(email, productId, quantity = 1, discount = false, productName, price, image,) {
        try {
            const cart = await this.findOne(email);
            if (!cart) {
                const newCart = await Cart.create({ email, status: "pending", created_at: moment().toString(), updated_at: moment().toString() });
                newCart.items.push({ productId, productName, price, image, quantity });
                await newCart.save();
                return ({ status: 201, msg: "Cart created" });
            } else {
                const objectCart = cart.toObject();
                const id = objectCart.items.filter((v) => v.productId == productId);
                if (id.length) {
                    // if quantity equals one dont substract
                    quantity = parseInt(quantity);
                    id[0].quantity = parseInt(id[0].quantity);
                    quantity = discount ? quantity : id[0].quantity + quantity
                    const updateCart = await Cart.findOneAndUpdate({ email, "items._id": id[0]._id },
                        {
                            "$set": {
                                "updated_at": moment().toString(),
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

    /**
     * When user pay, change status cart to payedm and create order
     * @param {Object User} user 
     * @returns Json(status)
     */
    async changeStatus(user) {
        try {
            const cart = await this.findOne(user.email);
            if (cart) {
                const updateCart = await Cart.findOneAndUpdate({ email: user.email, status: "pending", },
                    {
                        "$set": {
                            "status": "payed",
                            "updated_at": moment().toString(),
                        }
                    });
                const objectCart = cart.toObject();
                const ordersQuantity = await Order.countDocuments({});
                const newOrder = await Order.create({ email: user.email, status: "generated", id: ordersQuantity + 1, created_at: moment().toString(), updated_at: moment().toString() });
                objectCart.items.forEach(item => {
                    newOrder.items.push({
                        productId: item.productId, productName: item.productName,
                        price: item.price, image: item.image, quantity: item.quantity
                    });
                });
                await newOrder.save();
                await sendMail(user, objectCart.items, "Venta");
            }
        } catch (err) {
            error(err);
            return ({ status: 500, msg: "Cart error" });
        }
    }

    /**
     * When user reset cart to start new one
     * @param {Onject user} user 
     * @returns Json(status)
     */
    async deleteCart(user) {
        try {
            const newCart = await Cart.findOneAndDelete({ email: user.email, status: "pending" });
        } catch (err) {
            error(err);
            return ({ status: 404, msg: "No cart" });
        }
    }

    /**
     * List all cart
     * @param {string} email 
     * @returns Array(items)
     */
    async getAllItems(email) {
        const res = await this.findOne(email);
        const cart = res == null ? null : res.toObject();
        if (cart) {
            return cart.items;
        } else {
            return null;
        }
    }
}
