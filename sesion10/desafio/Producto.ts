export class Producto {
    private _list: any = []

    /**
     * obtener todos los productos
     */
    get list() {
        return this._list;
    }

    /**
     * 
     * @returns number: la cantidad de elementos que tiene Producto
     */
    public getLenght(): number {
        return this._list.length;
    }

    /**
     * 
     * @param id : 
     */
    public removeProduct(id: number) {
        this._list = this._list.filter( (element:{id: number,}) => element.id !== id); 
    }

    public updateProduct(id:number, newProduct:any){
        const indexOf = this.getIndexOfByid(id);
        this._list[indexOf].title = newProduct.title;
        this._list[indexOf].price = parseInt(newProduct.price);
        this._list[indexOf].thumbnail = newProduct.thumbnail;
    }

    /**
     * agregar un nuevo producto
     */
    set list(product: any) {
        product.id = (this._list.length || 0) + 1;
        product.price = parseInt(product.price);
        this._list.push(product);
    }

    /**
     * 
     * @param id: id del producto que se quiere retornar 
     * @returns producto
     */
    public getProductById(id: number) {
        return this._list.filter((element: { id: number; }) => element.id === id)[0];
    }

    /**
     * 
     * @param id: id del producto que se quiere retornar 
     * @returns posicion en el arreglo del id del producto
     */
    private getIndexOfByid(id:number){
        return this._list.indexOf(this.getProductById(id));
    }

    public isExist(id:number){
        return this._list.filter((element : {id:number}) =>element.id == id).length > 0 ? true : false;
    }

    public constructor() {

    }
}