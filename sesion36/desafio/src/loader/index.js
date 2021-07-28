import mongoose from "mongoose";

class MongoDBaaS {
    static async connect() {
        try {
            const res = await mongoose.connect(config.mongoURI, {
                useNewUrlParser: true,
                useCreateIndex: true, useUnifiedTopology: true
            });
            console.log(`MongoDBaaS: Connection ${mongoose.STATES[res.connection.readyState]}`);
        } catch (error) {
            console.log(`Error in DB connection ${error}`);
        }
    }
}

export const load = async () => {
    await MongoDBaaS.connect();
};
