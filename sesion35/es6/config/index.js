import dotenv from 'dotenv'
dotenv.config();

/** Loading from console if there is parameter */
if (process.argv.length == 5) {
    process.env.PORT = process.argv[2];
    process.env.FB_CLIENTID = process.argv[3];
    process.env.FB_CLIENTSECRET = process.argv[4];
}

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
    mongoMaxAge: process.env.MONGO_MAX_AGE,
    flagDB: process.env.FLAG_DB,
    default_factory_items: process.env.DEFAULT_FACTORY_ITEMS,
    loginUser: process.env.LOGIN_USER,
    loginPass: process.env.LOGIN_PASS,
    saltRounds: process.env.SALT_ROUNDS,
    oauthStrategy: {
        clientID: process.env.FB_CLIENTID,
        clientSecret: process.env.FB_CLIENTSECRET,
        callbackURL: process.env.FB_CALLBACKURL,
        profileFields: process.env.FB_PROFILEFIELDS,
        scope: process.env.FB_SCOPE,
    },
    random_numbers: process.env.RANDOM_NUMBERS,
    from_mail: process.env.FROM_MAIL,
    admin_mail: process.env.ADMIN_MAIL,
    subject_mail: process.env.SUBJECT_MAIL,
    ethereal_host: smtp.ethereal.email,
    ethereal_port: process.env.ETHEREAL_PORT,
    ethereal_user: process.env.ETHEREAL_USER,
    ethereal_user: process.env.ETHEREAL_PASS,
    gmail_service: process.env.GMAIL_SERVICE,
    gmail_user: process.env.GMAIL_USER,
    gmail_pass: process.env.GMAIL_PASS,
    twillio_sid: process.env.TWILLIO_SID,
    twillio_auth: process.env.TWILLIO_AUTH,
    twillio_from: process.env.TWILLIO_FROM,
    twillio_to: process.env.TWILLIO_TO,
    sms_text_notification: process.env.SMS_TEXT_NOTIFICATION,
}
