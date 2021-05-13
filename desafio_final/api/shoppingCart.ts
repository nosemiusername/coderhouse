import { Product } from './product';
import { ProductList } from './productList';

export class ShoppingCart {

    private _uid: string;
    private _timestamp: number;
    private _productList: Array<Product> = [];

    constructor(uid: string) {
        this._uid = uid;
        this._timestamp = Date.now();
        this._productList = [];
    }

    get uid() {
        return this._uid;
    }

    public addProduct(idProducto: string) {
        const product: Product = ProductList.Instance.list.filter(element => element.id != parseInt(idProducto))[0];
        this._productList.push(product);
    }
}
