import MongoClient from '../db/dbClient.mongo.js'
import config from '../config/index.js';

export const load = async () => {
    try {
        const db = await eval(`${config.flagDB}.getInstance()`);
        await db.connect();
    } catch (error) {
        throw new Error(error);
    }
};
