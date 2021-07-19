const path = require('path');
const dotenv = require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

/** Loading from console if there is parameter */
module.exports = {
    port: process.argv[2] || process.env.PORT,
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
