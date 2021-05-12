import { ProductList } from './productList';

export class Product {
    private _id: number;
    private _timestamp: Date;
    private _name: string;
    private _description: string;
    private _code: string;
    private _thumbnail: string;
    private _price: number;
    private _stock: number;

    get id() {
        return this._id;
    }

    // TODO: Implementar una forma mas elegante de actualizar 
    // sin tener que listarcada propiedad
    public update(newProduct: any) {
        this._timestamp = newProduct.timestamp;
        this._name = newProduct.name;
        this._description = newProduct.description;
        this._code = newProduct.code;
        this._thumbnail = newProduct.thumbnail;
        this._price = newProduct.price;
        this._stock = newProduct.stock;
    }

    public constructor(product:any) {
        const productList = ProductList.Instance;
        this._id = productList.getSize() + 1;
        this._timestamp = product.timestamp;
        this._name = product.name;
        this._description = product.description;
        this._code = product.code;
        this._thumbnail = product.thumbnail;
        this._price = product.price;
        this._stock = product.stock;

        console.log(this);
    }

}