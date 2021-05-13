import { Product } from './product';
import { save } from '../helper/functions';
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
    
    public addProduct(product: any) {
        this._list.push(new Product(product));
        save(this._list);
    }

    public updateProduct(id: string, product: Product) {
        const productToUpdate = this.getById(id)[0];
        if (productToUpdate) { 
            productToUpdate.update(product);
            save(this._list);
            return 1;
        } else {
            throw new Error(`Id not found`);
        }
    }

    public getById(id: string, equal: boolean = true): Array<Product> {
        return this._list.filter(element => equal ? element.id == parseInt(id) : element.id != parseInt(id));
    }

    public removeProduct(id: string) {
        const productToRemove = this.getById(id)[0];
        if (productToRemove) { 
            this._list = this.getById(id, false);
            save(this._list);
            return 1;
        } else {
            throw new Error(`Id not found`);
        }

    }

    constructor (){

    }
}
