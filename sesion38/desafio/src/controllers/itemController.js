import { ItemService } from "../services/itemService.js";
import { buildSchema } from 'graphql'
export class ItemController {
    static create(cant) {
        ItemService.create(cant);
    }

    static async search(productName = null) {
        const items = productName === null ? await ItemService.findAll() : await ItemService.findOne(productName);
        return items;
    }

    static generateItems(req, res, next) {
        const cant = req.query.cant || 1;
        ItemController.create(cant);
        res.json('ok');
    }
}

const getItem = async (query) => {
    const item = await ItemService.findOne(query.productName);
    return item;
}

const getAllItems = async () => {
    return await ItemService.findAll()
}

export const schemas = buildSchema(`
    type Query{
        find(productName: String!): Item,
        findAll: [Item],
    }
    
    type Item {
        id: ID!
        productName: String!
        department: String!
        price: Int!
        stock: Int!
        productDescription: String!
        image: String!
    }
    `
);

export const root = {
    find: getItem,
    findAll: getAllItems,
}
