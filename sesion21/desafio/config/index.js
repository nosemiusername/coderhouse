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
    mongoLocalURI: process.env.MONGO_LOCAL_URI,
    mongoDBaaSURI: process.env.MONGO_DBAAS,
    flagDB: process.env.FLAG_DB
}
