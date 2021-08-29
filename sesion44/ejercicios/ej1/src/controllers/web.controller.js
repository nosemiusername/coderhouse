import DAO from '../dao/wordDao.js';
import wordDto from '../dto/wordDto.js';
import wordDao from '../dao/wordDao.js';

export default class WordController {
    constructor() {
        this.dao = new DAO();
    }

    save(req, res, next) {
        try {
            const { word } = req.body;
            dato.save(word);
        } catch (error) {
            return { status: 501, msg: error };
        }
    }

    getWords() {
        try {
            const words = dao.getAll();
            if (!words.length) return { status: 501, msg: "No data" };
            words.map(word => dto(word));
            return words;
        } catch (error) {
            return { status: 501, msg: error };
        }
    }
}
