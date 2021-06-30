import { Router } from 'express';
import WebController from '../controllers/web.controller.js'
export const webRoute = Router();
import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import UserService from '../services/userService.js'

passport.use(new FacebookStrategy({
    clientID: "496117064774752",
    clientSecret: "d0619cb53fa5e4723ce3b381e3d1c013",
    callbackURL: 'http://localhost:8080/auth/fb/callback',
    profileFields: ['id', 'displayName', 'photos', 'emails'],
    scope: ['email'],
},
    async (accessesToken, refreshhToken, profile, done) => {
        try {
            const user = await UserService.find(profile.id);
            if (!user) {
                await UserService.create({
                    id: profile.id,
                    username: profile.displayName,
                    email: profile.emails[0].value,
                });
            }
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

const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.render('login');
    }
}

webRoute.get('/auth/fb', passport.authenticate('facebook'));
webRoute.get('/auth/fb/callback', passport.authenticate('facebook', { failureRedirect: '/auth/fb', successRedirect: '/chat' }),
    WebController.fbErrorHandler, WebController.sendIndex);
webRoute.get('/login', WebController.sendLogin);
webRoute.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin', successRedirect: '/chat' }));
webRoute.get('/faillogin', WebController.sendFailLogin);
webRoute.get('/chat', isAuth, WebController.sendIndex);
webRoute.get('/logout', WebController.sendLogout);
webRoute.get('/randoms', WebController.sendIndex);
webRoute.get('/', WebController.sendIndex);