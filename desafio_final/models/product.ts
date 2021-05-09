import {ProductList} from './productList';

export class Product {
    private _id:number;
    private _timestamp: Date;
    private _name: string;
    private _description: string;
    private _code: string;
    private _thumbnail: string;
    private _price: number;
    private _stock: number;

    get id(){
        return this._id;
    }

    //TODO: Complete editable properties
    public update(newProduct:any){
        this._timestamp = newProduct.timestamp;
    }

    public constructor(timestamp: Date, name: string, description: string,
        code: string, thumbnail: string, price: number, stock: number) {             
            const productList = new ProductList();
            this._id = productList.getSize() + 1;
            this._timestamp = timestamp; 
            this._name = name; 
            this._description = description; 
            this._code = code; 
            this._thumbnail = thumbnail; 
            this._price = price; 
            this._stock = stock; 
        }

}