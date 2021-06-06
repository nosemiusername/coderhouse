export class FSSchema {
    id;
    categoria;
    nombre;
    stock;

    get id() {
        return this.id;
    }

    constructor(id, product) {
        this.id = id + 1;
        this.categoria = product.categoria;
        this.stock = product.stock;
        this.nombre = product.nombre;

        console.log(this);
    }

}