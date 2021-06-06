import config from '../config/index.js';
import mongoose from 'mongoose';
class MongoLocal {
    static connect = async () => {
        try {
            const res = await mongoose.connect(config.mongoLocalURI, {
                useNewUrlParser: true,
                useCreateIndex: true, useUnifiedTopology: true
            });
            console.log(`Connection Succesful ${config.mongoLocalURI}`);
        } catch (error) {
            console.error(error);
        }
    }
}

class MongoDBaaS {
    static connect = async () => {
        try {
            const res = await mongoose.connect(config.mongoDBaaSURI, {
                useNewUrlParser: true,
                useCreateIndex: true, useUnifiedTopology: true
            });
            console.log(`Connection Succesful ${config.mongoDBaaSURI}`);
        } catch (error) {
            console.error(error);
        }
    }
}

class SQLite{
    static connect = () => {
        console.log(`Connection Succesful ${JSON.stringify(config.sqlite)}`);
    }
}

class MySQLLocal{
    static connect = () => {
        console.log(`Connection Succesful ${JSON.stringify(config.mysql)}`);
    }
}

class Firebase{
    static connect = () => {
        console.log(`Connection Succesful ${JSON.stringify(config.firebase)}`);
    }
}


export const loader = async() => { 
    const connection = await eval(`${config.flagDB}.connect()`);
}