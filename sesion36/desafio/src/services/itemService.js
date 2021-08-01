import { Item } from '../models/item.js'
import { error } from '../config/logger.js'
import faker from 'faker';
faker.locale = 'es';

export class ItemService {
    static create(cant) {
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

                const newItem = await Item.create(newItemDAO);
            })
        } catch (error) {
            error(error);
        }
    }

    static async findAll() {
        const items = await Item.find();
        return items;
    }
}