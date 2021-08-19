import ItemDAO from './itemDao.js';
import faker from 'faker';
import { error } from '../config/logger.js';
import config from '../config/index.js';
import fs from 'fs';
faker.locale = 'es';

export default class ItemDaoFile extends ItemDAO {

    constructor() {
        super();
        this.list = [];
        this.filename = config.filename;
    }

    updateById(id, newItem) {
        try {
            this.deleteById(id);
            newItem = [{ id: Number(id), ...newItem }];
            this.list = [... this.list, ...newItem]
            this.save(this.list);
        } catch (error) {
            console.error(error);
        }
    }

    getAll() {
        try {
            this.save(this.list);
            return this.list;
        } catch (error) {
            throw new Error(error);
        }
    }

    getById(id) {
        const item = this.list.filter(item => item.id == Number(id));
        if (!item.length) throw new Error("No data");
        this.save(this.list);
        return [item];
    }

    add(item) {
        this.list.push({ id: this.list.length, ...item });
        this.save(this.list);
        return item;
    }

    deleteById(id) {
        const item = this.list.filter(item => item.id == Number(id));
        if (!item.length) {
            throw new Error("No data");
        }

        this.list = this.list.filter(element => element.id != Number(id))
        this.save(this.list);
        return item;
    }

    deleteAll() {
        throw new Error('pending implementation!');
    }

    save(jsonData) {
        fs.writeFile(this.filename, JSON.stringify(jsonData, null, '\t'), function (err) {
            if (err) {
                error(err);
            }
        })
    };
}
