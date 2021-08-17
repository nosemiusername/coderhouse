
import ItemDAO from './itemDao.js';
import faker from 'faker';
import logger, { error } from '../config/logger.js';
faker.locale = 'es';

export default class ItemDaoMongo extends ItemDAO {

    constructor() {
        super();
        this.list = [];
    }

    updateById(id, newItem) {
        try {
            this.deleteItem(id);
            newItem = [{ id: Number(id), ...newItem }];
            this.list = [... this.list, ...newItem]
            this.save(this.list, config.fs.connection.filename);
        } catch (error) {
            console.error(error);
        }
    }

    getAll() {
        try {
            this.save(this.list, config.fs.connection.filename);
            return this.list;
        } catch (error) {
            throw new Error(error);
        }
    }

    getById(id) {
        const item = this.list.filter(item => item.id == Number(id));
        if (!item.length) throw new Error("No data");
        this.save(this.list, config.fs.connection.filename);
        return item;
    }

    insertItem(items) {
        items.forEach(item => {
            this.list.push({ id: this.list.length, ...item });
        });
        this.save(this.list, config.fs.connection.filename);
        return items;
    }

    deleteById(id) {
        const item = this.list.filter(item => item.id == Number(id));
        if (!item.length) throw new Error("No data");

        this.list = this.list.filter(element => element.id != Number(id))
        this.save(this.list, config.fs.connection.filename);

        return item;

    }
    deleteAll() {
        throw new Error('pending implementation!');
    }

    save(jsonData, filename = "../db/db.json") {
        fs.writeFile(filename, JSON.stringify(jsonData, null, '\t'), function (err) {
            if (err) {
                error(err);
            }
        })
    };
}
