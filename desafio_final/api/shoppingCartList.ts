import { Product } from './product';
import { ProductList } from './productList';
import { ShoppingCart } from './shoppingCart';

export class ShoppingCartList {
    private _list: Array<ShoppingCart> = [];
    static _instance: ShoppingCartList;

    public static get Instance() {
        return this._instance || (this._instance = new this())
    }

    public get list(): Array<ShoppingCart> {
        return this._list;
    }

    public getCarByUid(uid: string): Array<ShoppingCart> {
        return this._list.filter(element => element.uid == uid);
    }

    public addProductToCart(uid: string, idProduct: string) {
        if (ProductList.Instance.getById(idProduct)[0]) {
            const cart: ShoppingCart = this.getCarByUid(uid)[0];
            console.log(cart);
            if (cart) {
                cart.addProduct(idProduct);
            } else {
                const newCart = new ShoppingCart(uid);
                newCart.addProduct(idProduct);
                this._list.push(newCart);
                console.log(newCart);
            }
        } else {
            throw Error('Product not found');
        }
    }

    public removeProductFromCart(uid: string, idProduct: string) {
        const cart: ShoppingCart = this.getCarByUid(uid)[0];
        if (cart) {
            cart.removeProduct(idProduct);
        } else {
            throw Error('Cart not found');
        }
    }

}
