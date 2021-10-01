import mongoose from 'mongoose';
import config from '../config/index.js';
import DbClient from './dbClient.js'
import { info, error } from '../config/logger.js'

export default class Mongo extends DbClient {
    static instance;

    constructor() {
        super();
        this.connected = false;
        this.client = mongoose;
    }

    async connect() {
        try {
            const res = await this.client.connect(config.mongo_uri, {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
            });
            info(`MongoDBaaS: Connection ${mongoose.STATES[res.connection.readyState]}`);
            this.connected = true;
        } catch (error) {
            error(`Error in DB connection ${error}`);
            throw new Error(error);
        }
    }

    async disconnect() {
        try {
            await this.client.connection.close();
            this.connected = false;
        } catch {
            throw new Error(error);
        }

    }

    static getInstance() {
        return this.instance || (this.instance = new this());
    }
}
