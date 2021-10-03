import ItemDaoMongo from '../dao/itemDao.mongo.js';
import jwt from 'jsonwebtoken';
import { error } from '../config/logger.js';
import { UserController } from './userController.js';
import config from '../config/index.js';
/** API Rest **/
export class ItemController {

    /**
     * Factory. If needed other database, just add in enviroment, dao, and de clause over if
     * @param {string} config  
     *      database type
     */
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
            res.status(500).json(err.message);
            error(err.message);
        }
    }

    getItem = async (req, res, next) => {
        try {
            const { id } = req.params;
            const item = await this.itemDao.getById(id);
            res.status(200).json(item);
        } catch (err) {
            res.status(500).json(err.message);
            error(err.message);
        }
    }

    getAllItems = async (req, res, next) => {
        try {
            const items = await this.itemDao.getAll()
            res.status(200).json(items);
        } catch (err) {
            res.status(500).json(err.message);
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
            res.status(500).json(err.message);
            error(err.message);
        }
    }

    delete = async (req, res, next) => {
        try {
            const { id } = req.params;
            const items = await this.itemDao.deleteById(id);
            res.status(200).json(items);
        } catch (err) {
            res.status(404).json(err.message);
            error(err.message);
        }
    }

    generate = (req, res, next) => {
        try {
            const { quantity } = req.params;
            const items = this.itemDao.generate(quantity);
            res.status(200).json(items);
        } catch (err) {
            res.status(500).json(err.message);
            error(err.message);
        }
    }

    login = async (req, res, next) => {
        try {
            const { username, password } = req.body;
            const userController = new UserController(config.flagDB)
            const user = await userController.find(username, password);;
            if (user) {
                res.json({ token: this.generateToken(user.username) });
            } else {
                res.status(403).json("Not allowed");
            }
        } catch (err) {
            res.status(500).json(err.message);
            error(err.message);
        }
    }

    verify = async (req, res, next) => {
        const token = req.headers.authorization;
        if (!token) res.status(403).json("Not allowed");
        else {
            try {
                await jwt.verify(token.split(" ")[1], config.tokenSecret);
                next();
            } catch (err) {
                res.status(403).json("Not allowed");
            }
        }
    }

    generateToken = (user) => {
        return jwt.sign({ data: user }, config.tokenSecret, { expiresIn: config.jwt_max_age });
    };

    async getAll() {
        return await this.itemDao.getAll()
    }

    async get(id) {
        return await this.itemDao.getById(id);
    }
}

