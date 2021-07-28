import dotenv from 'dotenv';
dotenv.config();

export default {
    port: process.env.PORT,
    gmail_service: process.env.GMAIL_SERVICE,
    gmail_user: process.env.GMAIL_USER,
    gmail_pass: process.env.GMAIL_PASS,
    twillio_sid: process.env.TWILLIO_SID,
    twillio_auth: process.env.TWILLIO_AUTH,
    twillio_from: process.env.TWILLIO_FROM,
    twillio_to: process.env.TWILLIO_TO,
    subject_mail: process.env.SUBJECT_MAIL,
}