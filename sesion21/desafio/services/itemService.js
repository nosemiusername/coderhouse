"use strict";
import { mongoSchema } from '../models/Item.mongo.js'
import { sqliteSchema } from '../models/Item.sqlite.js';
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

class SQLite {
    crud;

    constructor() {
        this.crud = new SQLiteCrud();
    }
}
class MongoCrud {

    static async updateItem(id, newItem) {
        try {
            return await mongoSchema.updateOne({ _id: id }, { $set: newItem });
        } catch (error) {
            console.error(error);
        }
    }

    static async getAllItems() {
        try {
            return await mongoSchema.find();
        } catch (error) {
            console.error(error);
        }
    }

    static async getItemByID(id) {
        try {
            return await mongoSchema.find({ _id: id });
        } catch (error) {
            console.error(error);
        }
    }

    static async insertItem(items) {
        try {
            return await mongoSchema.create(items);
        } catch (error) {
            console.error(error);
        }
    }

    static async deleteItem(id) {
        try {
            const item = await this.getItemByID(id);
            if (item) {
                return await mongoSchema.deleteOne({ _id: id });
            } else {
                throw Error('No data found');
            }
        } catch (error) {
            console.error(error);
        }
    }
}


class SQLiteCrud {

    updateItem(id, newItem) {
        return sqliteSchema.knex('items').where({ id: id }).update(newItem);
    }

    getAllItems() {
        return sqliteSchema.knex('items').select();
    }

    getItemByID(id) {
        return sqliteSchema.knex('items').where({ id: id }).select();
    }

    insertItem(items) {
        return sqliteSchema.knex('items').insert(items);
    }

    async deleteItem(id) {
        const item = await this.selectTableByID(id);
        if (item.length) {
            return sqliteSchema.knex('items').where({ id: id }).delete();
        } else {
            throw Error('No data found');
        }
    }

    close() {
        return sqliteSchema.knex.destroy();
    }

}
class Factory {
    item;

    constructor(type) {
        try {
            this.item = eval(`new ${type}()`);
        } catch (e) {
            console.log('Error flagDB value');
            throw new Error(`flagDB is not valid`)
        }

    }
}

export default new Factory(config.flagDB);