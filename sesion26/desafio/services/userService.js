import {User} from '../models/user.mongo.js';
import config from '../config/index.js';
import bcrypt from 'bcrypt';
export default class UserService {

    static async create(user) {
        try {
            const hash = await bcrypt.hash(password, config.saltRounds);
            user.password = hash;
            const newUser = await User.create(user);
            return newUser
        } catch (error) {
            throw new Error(error);
        }
    };

    static async find(name, password = null) {
        const user = await User.findOne({ user: name});
        // if it need to compare name and password and password it is not validate return null
        // if it there is not user then return null
        // finally third case if it just need to know if exist user
        if (user && password){
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