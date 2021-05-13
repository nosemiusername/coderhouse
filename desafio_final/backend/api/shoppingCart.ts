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

    get productList(){
        return this._productList;
    }

    public addProduct(idProduct: string) {
        if (!this.getById(idProduct)[0]){
        const product: Product = ProductList.Instance.getById(idProduct)[0];
        this._productList.push(product);
        console.log(product);

        console.log(this._productList);
    }
    }

    public removeProduct(idProduct: string) {
        if (this.getById(idProduct)[0]){
        this._productList = this.getById(idProduct, false);
        } else {
            throw Error('Product not found');
        }
    }

    public getById(id: string, equal: boolean = true): Array<Product> {
        return this._productList.filter(element => equal ? element.id == parseInt(id) : element.id != parseInt(id));
    }
}
