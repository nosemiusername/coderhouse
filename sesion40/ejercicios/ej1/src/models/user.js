const user = [];

export class Users {

    get() {
        return user;
    }

    set(user) {
        user.push(user);
    }
}