import { UserDao } from "../dao/userDao.js";

export class UserController {
    // TODO manage catch error modify return 
    static async find(email, password) {
        try {
            const user = await UserDao.findOne(email, password);
            return user;
        } catch (error) {
            return null;
        }
    }

    // TODO manage catch error modify return 
    static async create(user) {
        try {
            const newuser = await UserDao.create(user);
            return newuser;
        } catch (error) {
            return null;
        }
    }

}