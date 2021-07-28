import { UserService } from "../services/userService.js";

export class UserController {
    // TODO manage catch error modify return 
    static async find(email, password) {
        try {
            const user = await UserService.findOne(email, password);
            return user;
        } catch (error) {
            return null;
        }
    }

    // TODO manage catch error modify return 
    static async create(name, email, password, age, address) {
        try {
            const create = await UserService.create(user);
        } catch (error) {
            return null;
        }
    }
}