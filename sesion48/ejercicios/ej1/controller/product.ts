export default class Product {
    private list = Array();
    constructor() {
        this.list = [];
    }

    public add(item: any): any {
        this.list.push(item);
        return item;
    }

    public getAll(): any {
        return this.list;
    }

}


