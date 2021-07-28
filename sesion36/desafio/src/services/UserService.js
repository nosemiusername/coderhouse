import { User } from '../models/user.js';
import bcrypt from 'bcrypt';
import { error } from '../config/logger.js'

export class UserService {

    static findOne(email, password) {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                error(err);
                throw new Error(err);
            }
            bycrypt.hash(password, salt, async (err, hash) => {
                if (err) {
                    error(err);
                    throw new Error(err);
                }
                const user = await User.findOne({ email: email, password: hash }).exec();
                user.select('-password');
                return user;
            });
        });
    }

    static create(name, email, password, age, address) {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                error(err);
                throw new Error(err);
            }
            bycrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    error(err);
                    throw new Error(err);
                }
                password = hash;
                User.create(name, email, password, age, address, (err, data) => {
                    {
                        error(err);
                        throw new Error(err);
                    }
                });
            });
        });
    }
}