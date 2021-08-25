
import ItemDAO from './itemDao.js';
import { Item } from '../models/item.mongo.js'
import faker from 'faker';
faker.locale = 'es';

export default class ItemDaoMongo extends ItemDAO {

    constructor() {
        super();
    }

    generate(cant, save = true) {
        const newItemList = [];
        try {
            Array.from(new Array(Number(cant)), async (v, k) => {
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
                    await this.create(newItemDAO);
                }
                newItemList.push(newItemDAO);
            })
        } catch (error) {
            error(error);
        } finally {
            return newItemList;
        }
    }

    async add(newItemDAO) {

        const existedItem = await this.findOne(newItemDAO.id);
        if (!existedItem) {
            const newItem = await Item.create(newItemDAO);
            return newItem;
        } else {
            throw new Error("Duplicated id");
        }
    }

    async getAll() {
        const res = await Item.find();
        const items = res.map(item => item.toObject());
        return items;
    }

    async getById(id) {
        const res = await Item.findOne({ id });
        const item = res == null ? [] : res.toObject();
        return [item];
    }

    async updateById(id, item) {
        const oldItem = await this.getById(id);
        if (!oldItem.length) throw new Error("No data");
        item = { ...oldItem, ...item };
        const res = await Item.findOneAndUpdate({ id },
            {
                $set: {
                    "productName": item.productName,
                    "department": item.department,
                    "price": item.price,
                    "stock": item.stock,
                    "productDescription": item.productDescription,
                    "image ": item.image,
                }
            });
        return res;
    }

    async deleteById(id) {
        throw new Error('pending implementation!');
    };
    async deleteAll() {
        throw new Error('pending implementation!');
    }
}
