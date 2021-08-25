export default class Dao {
    constructor() {
        this.words = [];
    }

    save(word) {
        this.save.push(word);
        return true;
    }

    getAll() {
        return this.words;
    }
}