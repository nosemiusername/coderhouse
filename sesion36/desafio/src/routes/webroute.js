import { Router } from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';;
import { UserController } from '../controllers/UserController.js';

export const webRouter = Router();
const __dirname = process.cwd();

passport.use('login', new LocalStrategy({ passReqToCallback: true }, async (req, email, password, done) => {
    const user = await UserController.find(email, password);
    if (user) {
        return done(null, user);
    } else {
        return donde(null, false);
    }
}))

passport.use('signup', new LocalStrategy({ passReqToCallback: true }, async (req, done) => {
    const user = await UserController.create(name, email, password, age, address);
    if (user) {
        return done(null, user);
    } else {
        return donde(null, false);
    }
}))

webRouter.post('/register', passport.authenticate('signup', { failureRedirect: '/failregister' }), (req, res, next) => {
    res.redirect('/failregister');
}
);

// webRouter.post('/register', passport.authenticate('signup', {failureRedirect:'/failregister', successRedirect:'/'}));
webRouter.post('/login', passport.authenticate('login', { failureRedirect: '/failregister' }), (req, res, next) => {
    res.redirect('/');
}
);

webRouter.get('/signup.html', (req, res, next) => {
    res.sendFile(`${__dirname}/src/public/signup.html`);
});

webRouter.get('/login.html', (req, res, next) => {
    res.sendFile(`${__dirname}/src/public/login.html`);
});
webRouter.get('/main.css', (req, res, next) => {
    res.sendFile(`${__dirname}/src/public/main.css`);
});

webRouter.get('/', (req, res, next) => {
    res.sendFile(`${__dirname}/src/public/login.html`);
});

webRouter.get('/fail', (req, res, next) => {
    res.json('fail');
});


webRouter.post('/register2', (req, res, next) => {
    res.status(200).json();
})