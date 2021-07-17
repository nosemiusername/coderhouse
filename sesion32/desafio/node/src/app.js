const app = require('express')()
const fork = require('child_process').fork
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('./config/index.js');
const PORT = config.port;
const compression = require('compression');
const { info, warn, error } = require('./config/logger.js');

app.use(cookieParser());
app.use(session({
    secret: 'coderhouse',
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy(config.oauthStrategy,
    async (accessesToken, refreshhToken, profile, done) => {
        try {
            return done(null, profile);
        } catch (error) {
            done(null, false, { message: error });
        };
    }
))

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser(async (obj, done) => {
    done(null, obj);
})


app.get('/auth/google', passport.authenticate('google', { scope: ["profile", "email"] }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/auth/google', successRedirect: '/random' }));

app.get('/random', (req, res) => {
    res.json("Inactive Method");
})

app.get('/info', compression(), (req, res, next) => {
    res.json({
        arg: process.argv,
        platform_name: process.platform,
        node_version: process.version,
        memory_usage: process.memoryUsage(),
        path_node: process.execPath,
        pid: process.pid,
        path_execution: process.cwd(),
    });
})

app.get('/div', (req, res, next) => {
    const { value1, value2 } = req.query;
    const result = {};
    result.value = 0;
    const num1 = parseFloat(value1);
    const num2 = parseFloat(value2);

    if (!isNaN(num1) && !isNaN(num2)) {
        if (num2 == 0) warn("0 divition")
        if (num2 != 0) {
            result.value = num1 / num2;
            info(result.value);
        }
    } else error("Not numeric values")

    res.json(result);
})

app.listen(PORT, () => {
    console.log(`Application is listening at port ${PORT}`);
})
