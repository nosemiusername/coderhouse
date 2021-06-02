"use strict";
import { Item as SchemaMongo } from '../models/Item.mongo.js'
import config from '../config/index.js';

class MongoLocal {
    crud;

    constructor() {
        this.crud = MongoCrud;
    }
}

class MongoDBaaS {
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


class SQLiteCrud {


    updateTable(id, newItem) {
        return this.knex('items').where({ id: id }).update(newItem);
    }


    selectTable() {
        return this.knex('items').select();
    }

    selectTableByID(id) {
        return this.knex('items').where({ id: id }).select();
    }

    insertTable(items) {
        return this.knex('items').insert(items);
    }

    async deleteTable(id) {
        const item = await this.selectTableByID(id);
        if (item.length) {
            return this.knex('items').where({ id: id }).delete();
        } else {
            throw Error('No data found');
        }
    }

    close() {
        return this.knex.destroy();
    }


}
class Factory {
    item;

    constructor(type) {
        try {
            this.item = eval(`new ${type}()`);
        } catch (e) {
            console.log('Error flagDB value');
            throw new Error(`flagDB v`)
        }

    }
}

export default new Factory(config.flagDB);