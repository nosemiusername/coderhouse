import Mongo from '../db/dbMongo.js';
import File from '../db/dbFile.js'
import config from '../config/index.js';

export const load = async () => {
    try {
        const db = await eval(`${config.flagDB}.getInstance()`);
        await db.connect();
    } catch (error) {
        throw new Error(error);
    }
};
