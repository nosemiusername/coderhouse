"use strict";
import { mongoSchema } from '../models/Item.mongo.js'
import { Item as SQLSchema } from '../models/Item.sqlite.js';
import config from '../config/index.js';
import admin from 'firebase-admin';


class Firebase {
    crud;

    constructor() {
        try {
            admin.initializeApp({
                credential: admin.credential.cert(config.firebase)
            });

            const db = admin.firestore();
            const schema = db.collection(config.firebase_collection);

            this.crud = new FirebaseCrud(schema);
        } catch (error) {
            throw new Error(error);
        }
    }
}

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
        const schema = new SQLSchema(config.sqlite);
        this.crud = new SQLCrud(schema);
    }
}

class MySQLLocal {
    crud;

    constructor() {
        const schema = new SQLSchema(config.mysql);
        this.crud = new SQLCrud(schema);
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

class FirebaseCrud {
    schema;

    constructor(schema) {
        this.schema = schema;
    }

    async updateItem(id, newItem) {
        const doc = await this.schema.doc(String(id)).get()
        if(doc.exists) return await this.schema.doc(String(id)).update(newItem);
        else throw new Error("No data");
    }

    async getAllItems() {
        try {
            const snapshot = await this.schema.get();
            if (snapshot.empty) return
    
            const documents = [];
            snapshot.forEach(doc => {
                documents.push({ id: doc.id, data: doc.data() })
                    ;
            })
            return documents;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getItemByID(id) {
        const doc = await this.schema.doc(String(id)).get()
        if(doc.exists) return doc.data();
        else throw new Error("No data");
    }

    async insertItem(items) {
        try {
            for await (const item of items){
                const allItems = await this.schema.get();
                await this.schema.doc(String(allItems._size + 1)).set(item);
            }
            return items;
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteItem(id) {
        const doc = await this.schema.doc(String(id)).get()
        if(doc.exists) return await this.schema.doc(String(id)).delete();
        else throw new Error("No data");
        
    }

}
class Factory {
    item;

    constructor(type) {
        try {
            console.log(type);
            this.item = eval(`new ${type}()`);
        } catch (e) {
            throw new Error(`flagDB is not valid`)
        }
    }
}

export default new Factory(config.flagDB);