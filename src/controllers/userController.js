import { UserDaoMongo } from "../dao/userDao.mongo.js";
export class UserController {

    /**
     * Factory. If needed other database, just add in enviroment, dao, and de clause over if
     * It added singleton cause its called more than one controller
     * @param {string} config  
     *      database type
     */
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

    async find(email, password) {
        try {
            const user = await this.userDao.findOne(email, password);
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