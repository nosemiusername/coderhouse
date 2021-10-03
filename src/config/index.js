import dotenv from 'dotenv';
import yargs from 'yargs';
import path from 'path';

dotenv.config({
    path: path.resolve(process.cwd(), `${process.env.NODE_ENV}.env`)
});

const { port } = yargs(process.argv.slice(2)).argv;

/** enable all enviromets to all modules that needed */
export default {
    env: process.env.NODE_ENV,
    port: port || process.env.PORT,
    gmail_service: process.env.GMAIL_SERVICE,
    gmail_user: process.env.GMAIL_USER,
    gmail_pass: process.env.GMAIL_PASS,
    subject_mail: process.env.SUBJECT_MAIL,
    mongo_uri: process.env.MONGO_URI,
    mongo_max_age: process.env.MONGO_MAX_AGE,
    saltrounds: process.env.SALTROUNDS,
    cluster_mode: process.env.CLUSTER_MODE,
    flagDB: process.env.FLAG_DB,
    tokenSecret: process.env.TOKEN_SECRET,
    jwt_max_age: process.env.JWT_MAX_AGE,
    admin_email: process.env.ADMIN_EMAIL,
}