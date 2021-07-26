import { Router } from 'express';
import WebController from '../controllers/web.controller.js'
export const webRoute = Router();
import passport from 'passport';
import UserService from '../services/userService.js'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import config from '../config/index.js';

passport.use(new GoogleStrategy(config.oauthStrategy,
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

webRoute.get('/auth/google', passport.authenticate('google', { scope: ["profile", "email"] }));
webRoute.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/auth/google', successRedirect: '/chat' }));
webRoute.get('/login', WebController.sendLogin);
webRoute.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin', successRedirect: '/chat' }));
webRoute.get('/faillogin', WebController.sendFailLogin);
webRoute.get('/chat', isAuth, WebController.sendIndex);
webRoute.get('/logout', WebController.sendLogout);
webRoute.get('/', WebController.sendIndex);