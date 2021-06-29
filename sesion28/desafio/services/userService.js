import { User } from '../models/user.mongo.js';
import config from '../config/index.js';
import bcrypt from 'bcrypt';
export default class UserService {

    static async create(user) {
        try {
            const newUser = await User.create(user);
            return newUser
        } catch (error) {
            throw new Error(error);
        }
    };

    static async find(id, password = null) {
        const res = await User.findOne({ id: id });
        const user = res == null ? null : res.toObject();
        return user;
    }
}