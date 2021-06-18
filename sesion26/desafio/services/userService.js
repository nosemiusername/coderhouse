import userSchema from './models/user.mongo';

export class UserService {

    async createUser(user) {
        try {
            const user = await userSchema.create(user);
            return user
        } catch (error) {
            throw new Error(error);
        }
    };

    async findOne(userName) { 
        const user = await userSchema.find({user:userName});
        return user;
}
