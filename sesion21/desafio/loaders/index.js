import config from '../config/index.js';
import mongoose from 'mongoose';

class MongoLocal {
    static connect = async () => {
        try {
            const res = await mongoose.connect(config.mongoURI, {
                useNewUrlParser: true,
                useCreateIndex: true, useUnifiedTopology: true
            });
            console.log(`Connection Succesful ${res}`);
        } catch (error) {
            console.error(error);
        }
    }
}

export const loader = async() => { 
    console.log('Loading...');
    const connection = await eval(`${config.flagDB}.connect()`);
}