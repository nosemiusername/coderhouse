import ItemDaoMongo from "../dao/itemDao.mongo.js";
import ItemDaoFile from "../dao/itemDao.file.js";
import ItemDto from "../dto/itemDto.js";
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

    async create(item) {
        return await this.itemDao.add(item);
    }

    async getItem(query) {
        return await this.itemDao.getById(query.id);
    }

    async getAllItems() {
        return await this.itemDao.getAllItems()
    }

    async updateItem(id, item) {
        return await this.itemDao.updateById(id, item);
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

