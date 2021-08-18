import mongoose from 'mongoose';
import config from '../config/index.js';
import DbClient from './dbClient.js'
import { info, error } from '../config/logger.js'

export default class File extends DbClient {
    static instance;

    constructor() {
        super();
        this.connected = false;
        this.client = 'file';
    }

    async connect() {
        try {
            this.connected = true;
        } catch (error) {
            error(`Error in DB connection ${error}`);
            throw new Error(error);
        }
    }

    async disconnect() {
        try {
            this.connected = false;
        } catch {
            throw new Error(error);
        }

    }

    static getInstance() {
        return this.instance || (this.instance = new this());
    }
}
