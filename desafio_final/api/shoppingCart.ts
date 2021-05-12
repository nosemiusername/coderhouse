import { Product } from './product';
import { ProductList } from './productList';
export class ShoppingCart {
    private _list: Array<Product> = [];
    static _instance: ShoppingCart;

    public static get Instance() {
        return this._instance || (this._instance = new this())
    }

    public get list(): Array<Product> {
        return this._list;
    }

    public getSize(): number {
        return this._list.length;
    }

    public addProduct(idProduct: string) {
        const producto = this.getByProductListId(idProduct)[0];
        if (producto) {
            this._list.push(producto);
        } else {
            throw Error('Id not found');
        }
    }

    public getByProductListId(id: string, equal: boolean = true): Array<Product> {
        const productList = ProductList.Instance;
        return productList.list.filter(element => equal ? element.id == parseInt(id) : element.id != parseInt(id));
    }

    public getById(id: string, equal: boolean = true): Array<Product> {
        return this._list.filter(element => equal ? element.id == parseInt(id) : element.id != parseInt(id));
    }

    public removeProduct(id: string) {
        const productToRemove = this.getById(id)[0];
        if (productToRemove) {
            this._list = this.getById(id, false);
            return 1;
        } else {
            throw new Error(`Id not found`);
        }

    }

    public constructor() {

    }
}
