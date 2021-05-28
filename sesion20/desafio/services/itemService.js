"use strict";
import { Item } from '../models/Item.js'

export default class ItemService{

    static async updateItem(id,newItem){
        return Item.updateOne({ObjectID:id},{$set:{newItem}});
    }

    static async getAllItems(){
        return Item.findMany({});
    }

    static async getItemByID(id){
        return this.knex('items').where({ObjectID:id}).select();
    }

    static async insertItem(items){
        return this.knex('items').insert(items);
    } 

    static async deleteItem(id){
        const item = await this.selectTableByID(id);
        if (item.length) {
            return this.knex('items').where({id:id}).delete();
        } else {
            throw Error('No data found');
        } 
    }

}