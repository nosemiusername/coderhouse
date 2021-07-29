import { Router } from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';;
import { UserController } from '../controllers/UserController.js';

export const webRouter = Router();
const __dirname = process.cwd();

passport.use('login', new LocalStrategy(async (email, password, done) => {
    const user = await UserController.find(email, password);
    if (user) {
        return done(null, user);
    } else {
        return donde(null, false);
    }
}))

passport.use('signup', new LocalStrategy(async (name, email, password, age, address, done) => {
    const user = await UserController.create(name, email, password, age, address);
    if (user) {
        return done(null, user);
    } else {
        return donde(null, false);
    }
}))

webRouter.post('/register', passport.authenticate('signup', { failureRedirect: '/signup.html' }), (req, res, next) => {
    res.redirect('/');
}
);

webRouter.post('/login', passport.authenticate('signup', { failureRedirect: '/login.html' }), (req, res, next) => {
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