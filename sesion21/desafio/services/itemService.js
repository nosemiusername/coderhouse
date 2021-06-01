"use strict";
import { Item } from '../models/Item.mongo.js'

class MongoLocalFactory{
    crud(){
        return new MongoCrud();
    }
}


export default class MongoCrud {

    async updateItem(id, newItem) {
        try {
            return await Item.updateOne({ _id:id }, { $set: newItem});
        } catch (error) {
            console.error(error);
        }
    }

    async getAllItems() {
        try {
            return await Item.find();
        } catch (error) {
            console.error(error);
        }
    }

    async getItemByID(id) {
        try {
            return await Item.find({ _id: id });
        } catch (error) {
            console.error(error);
        }
    }

    async insertItem(items) {
        try {
            return await Item.create(items);
        } catch (error) {
            console.error(error);
        }
    }

    async deleteItem(id) {
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
}