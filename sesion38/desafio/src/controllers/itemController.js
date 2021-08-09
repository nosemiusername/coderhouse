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

    static async set(id, item) {
        const rs = await ItemService.update(id, item);
    }

}

const getItem = async (query) => {
    const item = await ItemService.findOne(query.id);
    return item;
}

const getAllItems = async () => {
    return await ItemService.findAll()
}

const updateItem = async ({ id, item }) => {
    return await ItemService.update(id, item);
}


export const schemas = buildSchema(`
    type Query{
        find(id: ID!): Item,
        findAll: [Item],
    }
    
    type Mutation {
        update(id: ID!, item:ItemInput!):Item
    }

    input ItemInput {
        productName: String
        department: String
        price: Int
        stock: Int
        productDescription: String
        image: String
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
    update: updateItem,
}
