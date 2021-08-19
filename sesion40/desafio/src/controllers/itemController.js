import ItemDaoMongo from "../dao/itemDao.mongo.js";
import ItemDaoFile from "../dao/itemDao.file.js";
import ItemDto from "../dto/itemDto.js";
import { buildSchema } from 'graphql'
import { error } from '../config/logger.js'
/** API Rest **/
export class ItemController {

    constructor(config) {
        if (config == "Mongo") {
            this.itemDao = new ItemDaoMongo();
        } else if (config == "File") {
            this.itemDao = new ItemDaoFile();
        }
    }

    create(req, res, next) {
        try {
            const items = this.itemDao.add(req.body);
            res.status(200).json(items);
        } catch (err) {
            res.status(501).json('Internal server Error');
            error(err);
        }
    }

    async search(req, res, next) {
        try {
            const { id } = req.params;
            const items = id === undefined ? await this.itemDao.getAll() : await this.itemDao.getById(id);
            const itemsDto = items.map(item => ItemDto(item));
            res.status(200).json(itemsDto);
        } catch (err) {
            res.status(501).json('Internal server Error');
            error(err);
        }
    }

    async generate(req, res, next) {
        try {
            const cant = req.params.cant || 1;
            const items = await this.itemDao.generate(cant);
            res.status(200).json(items);
        } catch (err) {
            res.status(501).json('Internal server Error');
            error(err);
        }
    }

    async update(req, res, next) {
        try {
            const items = await this.itemDao.updateById(req.params.id, req.body);
            res.status(200).json(items);
        } catch (err) {
            res.status(501).json('Internal server Error');
            error(err);
        }
    }

    async delete(req, res, next) {
        try {
            const items = await this.itemDao.deleteById(req.params.id);
            res.status(200).json(items);
        } catch (err) {
            res.status(501).json('Internal server Error');
            error(err);
        }
    }
}

/** Graphql **/

const getItem = async (query) => {
    const item = await this.itemDao.getById(query.id);
    return item;
}

const getAllItems = async () => {
    return await this.itemDao.getAllItems()
}

const updateItem = async ({ id, item }) => {
    return await this.itemDao.updateById(id, item);
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
