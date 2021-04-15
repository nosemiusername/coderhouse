export class Producto{
    private _list:any =[]

    /**
     * obtener todos los productos
     */
    get list(){
        return this._list;
    }

    /**
     * agregar un nuevo producto
     */
    set list(value:any){
        value.id = (this._list.length||0)+1;
        this._list.push(value);
    }

    public constructor(){

    }

    /**
     * 
     * @param value: id del producto que se quiere retornar 
     * @returns producto
     */
    public getProductById(value:number){
        return this._list.filter( (element: { id: number; }) => element.id === value)[0];
    }
}