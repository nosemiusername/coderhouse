import { Router } from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';;
import { UserController } from '../controllers/userController.js';
import { WebController } from '../controllers/webController.js';

export const webRouter = Router();

passport.use('login', new LocalStrategy(async (username, password, done) => {
    const user = await UserController.find(username, password);
    if (user) {
        return done(null, user);
    } else {
        return done(null, false);
    }
}))

passport.use('signup', new LocalStrategy({ passReqToCallback: true }, async (req, username, password, done) => {
    const { age, address, email } = req.body;
    const user = await UserController.find(username);
    if (user) {
        return done('User already exist');
    }
    const newuser = await UserController.create({ username, password, age, address, email });
    return done(null, newuser);
}))

passport.serializeUser((user, done) => {
    done(null, user.username);
})

passport.deserializeUser(async (username, done) => {
    const user = await UserController.find(username);
    done(null, user);
})

const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.render('login');
    }
}

webRouter.post('/register', passport.authenticate('signup', { failureRedirect: '/failregister' }), WebController.sendHome);;
webRouter.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), WebController.sendHome);
webRouter.get('/failregister', WebController.failRegister);
webRouter.get('/faillogin', WebController.failLogin);
webRouter.get('/logout', WebController.sendIndex);
webRouter.get('/generateitems', WebController.generateItems);
webRouter.get('/', WebController.sendIndex);


