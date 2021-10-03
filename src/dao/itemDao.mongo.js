
import ItemDao from './itemDao.js';
import { Item } from '../models/item.mongo.js';
import { validateNewItem, validateUpdatedItem } from '../validations/item.js';
import faker from 'faker';
import { mongoToObject } from '../utils/index.js'
faker.locale = 'es';

export default class ItemDaoMongo extends ItemDao {

    constructor() {
        super();
    }

    /**
     * Create randoms items
     * @param {int} quantity 
     * @param {bool} save 
     * @returns Item
     */
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

    /**
     * Add one item
     * @param {Item} newItemDAO 
     * @returns Item
     */
    async add(newItemDAO) {
        if (validateNewItem(newItemDAO).result) {
            const existedItem = await this.getById(newItemDAO.id);
            if (!existedItem.length) {
                const newItem = await Item.create(newItemDAO);
                return newItem;
            } else {
                throw new Error("Duplicated id");
            }
        } else {
            throw new Error("Validate item error");
        }
    }

    /**
     * List items
     * @returns Array(Item)
     */
    async getAll() {
        const res = await Item.find();
        const items = res.map(item => item.toObject());
        return items;
    }

    /**
     * Find by productId or department name
     * @param {string} id 
     * @returns Array(Item)
     */
    async getById(id) {
        const res = !isNaN(id) ? await Item.findOne({ id }) : await Item.find({ department: id });
        const items = mongoToObject(res);
        return items;
    }

    /**
     * Find by product Id and replace for Item
     * @param {string} id 
     * @param {Item} item 
     * @returns updated item
     */
    async updateById(id, item) {
        const existedItem = await this.getById(id);
        if (existedItem.length) {
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
        } else {
            throw new Error("Id not found");
        }
    }

    /**
     * Delete Item by product id
     * @param {string} id 
     * @returns 
     */
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

    /**
     * TODO: Delete all items.
     */
    async deleteAll() {
        throw new Error('pending implementation!');
    }
}
