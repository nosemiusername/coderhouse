import ItemDaoMongo from "../dao/itemDao.mongo.js";
import { error } from '../config/logger.js'
/** API Rest **/
export class ItemController {

    constructor(config) {
        if (config == "Mongo") {
            this.itemDao = new ItemDaoMongo();
        }
    }

    create = async (req, res, next) => {
        try {
            const item = req.body;
            const createdItem = await this.itemDao.add(item);
            res.status(200).json(item);
        } catch (err) {
            res.status(501).json(err.message);
            error(err.message);
        }
    }

    getItem = async (req, res, next) => {
        try {
            const { id } = req.params;
            const item = await this.itemDao.getById(id);
            res.status(200).json(item);
        } catch (err) {
            res.status(501).json(err.message);
            error(err.message);
        }
    }

    getAllItems = async (req, res, next) => {
        try {
            const items = await this.itemDao.getAll()
            res.status(200).json(items);
        } catch (err) {
            res.status(501).json(err.message);
            error(err.message);
        }
    }

    updateItem = async (req, res, next) => {
        //id, item
        try {
            const { id } = req.params;
            const item = req.body;
            const updatedItem = await this.itemDao.updateById(id, item);
            res.status(200).json(updatedItem);
        } catch (err) {
            res.status(501).json(err.message);
            error(err.message);
        }
    }

    delete = async (req, res, next) => {
        try {
            const { id } = req.params;
            const items = await this.itemDao.deleteById(id);
            res.status(200).json(items);
        } catch (err) {
            res.status(501).json(err.message);
            error(err.message);
        }
    }

    generate = (req, res, next) => {
        try {
            const { quantity } = req.params;
            const items = this.itemDao.generate(quantity);
            res.status(200).json(items);
        } catch (err) {
            res.status(501).json(err.message);
            error(err.message);
        }
    }

    async getAll() {
        return await this.itemDao.getAll()
    }
}

