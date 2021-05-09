import { Product } from './product';

export class ProductList {
    private _list: Array<Product> = [];
    static _instance: ProductList;

    public static getInstance() {
        return this._instance || (this._instance = new ProductList())
    }

    public get list(): Array<Product> {
        return this._list;
    }

    public getSize(): number {
        return this._list.length;
    }
    public addProduct(product: Product) {
        this._list.push(product);
    }

    public updateProduct(id: string, product: Product) {
        this.getById(id)[0].update(product);
    }

    public getById(id: string, equal: boolean = true): Array<Product> {
        return this._list.filter(element => equal ? element.id == parseInt(id) : element.id != parseInt(id));
    }

    public removeProduct(id: string) {
        this._list = this.getById(id, false);
    }

}
