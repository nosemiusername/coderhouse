import { Product } from './product';
export class ProductList {
    private _list: Array<Product> = [];
    static _instance: ProductList;

    public static get Instance() {
        return this._instance || (this._instance = new this())
    }

    public get list(): Array<Product> {
        return this._list;
    }

    public getSize(): number {
        return this._list.length;
    }
    
    constructor (){

    }
}
