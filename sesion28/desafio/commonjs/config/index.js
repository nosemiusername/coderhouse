const dotenv = require('dotenv')
dotenv.config();

/** Loading from console if there is parameter */
if (process.argv.length == 5) {
    process.env.PORT = process.argv[2];
    process.env.FB_CLIENTID = process.argv[3];
    process.env.FB_CLIENTSECRET = process.argv[4];
}

module.exports = {
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
}
