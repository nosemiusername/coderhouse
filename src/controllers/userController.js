import { UserDaoMongo } from "../dao/userDao.mongo.js";
export class UserController {

    constructor(config) {
        if (!UserController._instance) {
            if (config == "Mongo") {
                this.userDao = new UserDaoMongo();
            }
            UserController._instance = this;
        } else {
            return UserController._instance;
        }
    }

    async find(username, password) {
        try {
            const user = await this.userDao.findOne(username, password);
            return user;
        } catch (error) {
            return null;
        }
    }



    async create(user) {
        try {
            const newuser = await this.userDao.create(user);
            return newuser;
        } catch (error) {
            return null;
        }
    }

}