import { Product } from './product';
import { ProductList } from './productList';
import { ShoppingCart } from './shoppingCart';
import { save } from '../helper/functions';
export class ShoppingCartList {
    private _list: Array<ShoppingCart> = [];
    static _instance: ShoppingCartList;

    public static get Instance() {
        return this._instance || (this._instance = new this())
    }

    public get list(): Array<ShoppingCart> {
        return this._list;
    }

    public getCartByUid(uid: string): Array<ShoppingCart> {
        return this._list.filter(element => element.uid == uid);
    }

    public getProductById(uid: string, idProduct: string): Product {
        if (this.getCartByUid(uid)[0]) {
            if (ProductList.Instance.getById(idProduct)[0]) {
                const cart: ShoppingCart = this.getCartByUid(uid)[0];
                return cart.productList.filter(element => element.id == parseInt(idProduct))[0];
            }
            else {
                throw Error('Product not found');
            }
        } else {
            throw Error('Cart not found');
        }

    }

    public addProductToCart(uid: string, idProduct: string) {
        if (ProductList.Instance.getById(idProduct)[0]) {
            const cart: ShoppingCart = this.getCartByUid(uid)[0];
            console.log(cart);
            if (cart) {
                cart.addProduct(idProduct);
            } else {
                const newCart = new ShoppingCart(uid);
                newCart.addProduct(idProduct);
                this._list.push(newCart);
                console.log(newCart);
            }
            save(this._list, 'shoppngCartList');
        } else {
            throw Error('Product not found');
        }
    }

    public removeProductFromCart(uid: string, idProduct: string) {
        const cart: ShoppingCart = this.getCartByUid(uid)[0];
        if (cart) {
            cart.removeProduct(idProduct);
            save(this._list, 'shoppngCartList');
        } else {
            throw Error('Cart not found');
        }
    }

}
