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
    mysql: {
        client: process.env.MYSQL_CLIENT,
        connection: {
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            port: process.env.MYSQL_PORT
        }
    },
    mongoLocalURI: process.env.MONGO_LOCAL_URI,
        mongoDBaaSURI: process.env.MONGO_DBAAS,
        flagDB: process.env.FLAG_DB
    }
