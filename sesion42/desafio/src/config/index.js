import dotenv from 'dotenv';
import yargs from 'yargs';
import path from 'path';

dotenv.config({
    path: path.resolve(process.cwd(), `${process.env.NODE_ENV}.env`)
});

const { port } = yargs(process.argv.slice(2)).argv;

export default {
    env: process.env.NODE_ENV,
    port: port || process.env.PORT,
    gmail_service: process.env.GMAIL_SERVICE,
    gmail_user: process.env.GMAIL_USER,
    gmail_pass: process.env.GMAIL_PASS,
    twillio_sid: process.env.TWILLIO_SID,
    twillio_auth: process.env.TWILLIO_AUTH,
    twillio_from: process.env.TWILLIO_FROM,
    subject_mail: process.env.SUBJECT_MAIL,
    mongo_uri: process.env.MONGO_URI,
    mongo_max_age: process.env.MONGO_MAX_AGE,
    saltrounds: process.env.SALTROUNDS,
    cluster_mode: process.env.CLUSTER_MODE,
    flagDB: process.env.FLAG_DB,
    filename: process.env.FILENAME,
}