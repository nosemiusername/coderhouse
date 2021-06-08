"use strict";
import { Item } from '../models/Item.js';
import { getItem } from '../factories/item.js'
import config  from '../config/index.js';
export default class ItemService {

    static async updateItem(id, newItem) {
        try {
            return await Item.updateOne({ _id:id }, { $set: newItem});
        } catch (error) {
            console.error(error);
        }
    }

    static async getAllItems() {
        try {
            return await Item.find();
        } catch (error) {
            console.error(error);
        }
    }

    static async getItemByID(id) {
        try {
            return await Item.find({ _id: id });
        } catch (error) {
            console.error(error);
        }
    }

    static async insertItem(items) {
        try {
            return await Item.create(items);
        } catch (error) {
            console.error(error);
        }
    }

    static async deleteItem(id) {
        try {
            const item = await this.getItemByID(id);
            if (item) {
                return await Item.deleteOne({ _id: id });
            } else {
                throw Error('No data found');
            }
        } catch (error) {
            console.error(error);
        }
    }

    static generateItem(cant){
        const itemsQuantity = cant ? Number(cant) : config.default_factory_items;
        Array.from(new Array(Number(itemsQuantity)), (v, k) => {
          this.insertItem(getItem());  
        })
    }
}