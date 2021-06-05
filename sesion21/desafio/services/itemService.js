"use strict";
import { mongoSchema } from '../models/Item.mongo.js'
import { Item as SQLSchema } from '../models/Item.sqlite.js';
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
        const sqliteSchema = new SQLSchema(config.sqlite);
        this.crud = new SQLCrud(sqliteSchema);
    }
}

class MySQLLocal {
    crud;

    constructor() {
        const sqliteSchema = new SQLSchema(config.mysql);
        this.crud = new SQLCrud(sqliteSchema);
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


class SQLCrud {
    schema;

    constructor(schema) {
        this.schema = schema;
    }

    updateItem(id, newItem) {
        return this.schema.knex('items').where({ id: id }).update(newItem);
    }

    getAllItems() {
        return this.schema.knex('items').select();
    }

    getItemByID(id) {
        return this.schema.knex('items').where({ id: id }).select();
    }

    insertItem(items) {
        return this.schema.knex('items').insert(items);
    }

    async deleteItem(id) {
        const item = await this.getItemByID(id);
        if (item) {
            return this.schema.knex('items').where({ id: id }).delete();
        } else {
            throw Error('No data found');
        }
    }

    close() {
        return this.schema.knex.destroy();
    }

}
class Factory {
    item;

    constructor(type) {
        try {
            this.item = eval(`new ${type}()`);
        } catch (e) {
            throw new Error(`flagDB is not valid`)
        }

    }
}

export default new Factory(config.flagDB);