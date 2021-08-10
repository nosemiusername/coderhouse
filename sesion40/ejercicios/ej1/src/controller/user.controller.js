import { User } from '../models/user.js';


export class UserController {
    static findAll() {
        User.get();
    }

    static create(user) {
        User.set(user);
    }
}