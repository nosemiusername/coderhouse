import mongoose from "mongoose";
import config from '../config/index.js';
import { info } from '../config/logger.js'

class MongoDBaaS {
    static async connect() {
        try {
            const res = await mongoose.connect(config.mongo_uri, {
                useNewUrlParser: true,
                useCreateIndex: true, useUnifiedTopology: true
            });
            info(`MongoDBaaS: Connection ${mongoose.STATES[res.connection.readyState]}`);
        } catch (error) {
            info(`Error in DB connection ${error}`);
        }
    }
}

export const load = async () => {
    await MongoDBaaS.connect();
};
