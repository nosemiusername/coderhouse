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
    flagDB: process.env.FLAG_DB,
    firebase: {
        type:process.env.FIREBASE_TYPE,
        project_id:process.env.FIREBASE_PROJECT_ID,
        private_key_id:process.env.FIREBASE_PRIVATE_KEY_ID,
        private_key:process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        client_email:process.env.FIREBASE_CLIENT_EMAIL,
        client_id:process.env.FIREBASE_CLIENT_ID,
        auth_uri:process.env.FIREBASE_AUTH_URI,
        token_uri:process.env.FIREBASE_TOKEN_URI,
        auth_provider_x509_cert_url:process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url:process.env.FIREBASE_CLIENT_X509_CERT_URL,
    },
    firebase_collection:process.env.FIREBASE_COLLECTION,
    fs:{
        connection: {
            filename: process.env.FS_FILENAME
        },
    }
}
