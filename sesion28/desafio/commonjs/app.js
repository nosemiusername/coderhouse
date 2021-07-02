const app = require('express')()
const PORT = process.argv[2] || 8080
const maxRandomNumber = 10
const fork = require('child_process').fork
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('./config/index.js');

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
    if (req.isAuthenticated()) {
        const cant = Number(req.query.cant) || maxRandomNumber;
        const forked = fork('./helper/random.js');
        forked.on('message', numbers => {
            res.json(numbers);
        })
        forked.send(cant);
    } else {
        res.redirect('/auth/google');
    }

})

app.listen(PORT, () => {
    console.log(`Application is listening at port ${PORT}`);
})
