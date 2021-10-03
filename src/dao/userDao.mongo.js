import { User } from '../models/user.mongo.js';
import UserDao from './userDao.js';
import bcrypt from 'bcrypt';
import config from '../config/index.js'
import { sendMail } from '../helper/index.js'

export class UserDaoMongo extends UserDao {

    /**
     * Create new user
     * @param {string} user 
     * @returns User
     */
    async create(user) {
        try {
            const hash = await bcrypt.hash(user.password, Number(config.saltrounds));
            user.password = hash;
            const newUser = await User.create(user);
            await sendMail(user, null, "Creación Usuario");
            return newUser
        } catch (error) {
            throw new Error(error);
        }
    };

    /**
     * Find existing user
     * @param {string} username 
     * @param {string} password 
     * @returns 
     */
    async findOne(username, password = null) {
        const res = await User.findOne({ username: username });
        const user = res == null ? null : res.toObject();
        if (user && password) {
            const isValidate = await bcrypt.compare(password, user.password);
            if (!isValidate) {
                return null;
            }
        } else if (!user) {
            return null;
        }

        user.password = null;
        return user;
    }
}