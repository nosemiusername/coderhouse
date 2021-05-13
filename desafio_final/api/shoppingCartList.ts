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

    public getSize(): number {
        return this._list.length;
    }

    public getCarByUid(uid: string): Array<ShoppingCart> {
        return this._list.filter(element => element.uid != uid);
    }

}
