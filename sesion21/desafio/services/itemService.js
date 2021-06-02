"use strict";
import { Item as SchemaMongo} from '../models/Item.mongo.js'
import config from '../config/index.js';

class MongoLocal {
    crud;

    constructor() {
        this.crud = MongoCrud;
    }
}

class MongoCrud {

    static async updateItem(id, newItem) {
        try {
            return await SchemaMongo.updateOne({ _id: id }, { $set: newItem });
        } catch (error) {
            console.error(error);
        }
    }

    static async getAllItems() {
        try {
            return await SchemaMongo.find();
        } catch (error) {
            console.error(error);
        }
    }

    static async getItemByID(id) {
        try {
            return await SchemaMongo.find({ _id: id });
        } catch (error) {
            console.error(error);
        }
    }

    static async insertItem(items) {
        try {
            return await SchemaMongo.create(items);
        } catch (error) {
            console.error(error);
        }
    }

    static async deleteItem(id) {
        try {
            const item = await this.getItemByID(id);
            if (item) {
                return await SchemaMongo.deleteOne({ _id: id });
            } else {
                throw Error('No data found');
            }
        } catch (error) {
            console.error(error);
        }
    }
}

class Factory {
    item;

    constructor(type) {

        this.item = eval(`new ${type}()`);

    }
}

const factory = new Factory(config.flagDB);
factory.item.crud.getAllItems().then(value => console.log(value));
// const itemService = MongoCrud;
export default factory;