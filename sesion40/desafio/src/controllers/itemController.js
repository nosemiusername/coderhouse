import { ItemService } from "../services/itemService.js";
import { buildSchema } from 'graphql'

export class ItemController {
    static create(req, res, next) {
        try {
            const items = ItemService.create(req.body);
            res.status(200).json(items);
        } catch (error) {
            res.status(501).json('Internal server Error');
        }
    }

    static async search(req, res, next) {
        try {
            const { id } = req.params;
            const items = id === undefined ? await ItemService.findAll() : await ItemService.findOne(id);
            res.status(200).json(items);
        } catch (error) {
            res.status(501).json('Internal server Error');
        }
    }

    static async generate(req, res, next) {
        try {
            const cant = req.params.cant || 1;
            const items = await ItemService.generate(cant);
            res.status(200).json(items);
        } catch (error) {
            res.status(501).json('Internal server Error');
        }
    }

    static async update(req, res, next) {
        try {
            const items = await ItemService.update(req.params.id, req.body);
            res.status(200).json(items);
        } catch (error) {
            res.status(501).json('Internal server Error');
        }
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
