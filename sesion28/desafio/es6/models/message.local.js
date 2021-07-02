export class Message {
    static instance;
    list = [];


    static getInstance(){
        return this.instance || (this.instance = new this())
    }

    add(chat){
        this.list.push(chat);
    }

    get(){
        return this.list;
    }
}