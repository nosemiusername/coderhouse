
import ItemDAO from './itemDao.js';
import { Item } from '../models/item.mongo.js';
import { validateNewItem, validateUpdatedItem } from '../validations/item.js';
import faker from 'faker';
import { mongoToObject } from '../utils/index.js'
faker.locale = 'es';

export default class ItemDaoMongo extends ItemDAO {

    constructor() {
        super();
    }

    generate(quantity, save = true) {
        const newItemList = [];
        Array.from(new Array(Number(quantity)), async (v, k) => {
            const newItemDAO = {
                id: Math.floor(Math.random() * 100000),
                productName: faker.commerce.productName(),
                department: faker.commerce.department(),
                price: Math.floor(Math.random() * 10000),
                stock: Math.floor(Math.random() * 255),
                productDescription: faker.commerce.productDescription(),
                image: `${faker.image.nature()}?random=${Math.round(Math.random() * 1000)}`
            };
            if (save) {
                await this.add(newItemDAO);
            }
            newItemList.push(newItemDAO);
        });
        return quantity;
    }

    async add(newItemDAO) {
        if (validateNewItem(newItemDAO).result) {
            const existedItem = await this.getById(newItemDAO.id);
            if (!existedItem) {
                const newItem = await Item.create(newItemDAO);
                return newItem;
            } else {
                throw new Error("Duplicated id");
            }
        } else {
            throw new Error("Validate item error");
        }
    }

    async getAll() {
        const res = await Item.find();
        const items = res.map(item => item.toObject());
        return items;
    }

    async getById(id) {
        const res = !isNaN(id) ? await Item.findOne({ id }) : await Item.find({ department: id });
        const item = mongoToObject(res);
        return item;
    }

    async updateById(id, item) {
        if (validateUpdatedItem(item).result) {
            const oldItem = await this.getById(id);
            if (!oldItem) throw new Error("No data");
            const filter = { id: id };
            const update = { ...oldItem, ...item };
            const res = await Item.findOneAndUpdate(filter, update, { returnOriginal: false });
            return res;
        } else {
            throw new Error("Validate item error");
        }
    }

    async deleteById(id) {
        const existedItem = await this.getById(id);
        if (existedItem) {
            const filter = { id: id };
            const newItem = await Item.deleteOne(filter);
            return newItem;
        } else {
            throw new Error("Product not found");
        }
    };

    async deleteAll() {
        throw new Error('pending implementation!');
    }
}
