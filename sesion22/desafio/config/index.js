import dotenv from 'dotenv'
dotenv.config();

export default {
    port: process.env.PORT,
    sqlite: {
        client: process.env.SQLITE_CLIENT,
        connection: { 
            filename: process.env.SQLITE_FILENAME 
        },
        useNullAsDefault: process.env.SQLITE_UNAD 
    },
    mongoURI: process.env.MONGO_URI,
    flagDB: process.env.FLAG_DB,
    default_factory_items: process.env.DEFAULT_FACTORY_ITEMS,
}
