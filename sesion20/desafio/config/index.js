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
    mongo: process.env.MONGO_URL
}
