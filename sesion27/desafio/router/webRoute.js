import {Router} from 'express';
import WebController from '../controllers/web.controller.js'
export const webRoute = Router();
import passport, { Passport } from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import UserService from '../services/userService.js'


// passport.use('login', new LocalStrategy(async (username, password, done) => {
//     const user = await UserService.find(username, password)
//     if (!user){
//         return done(null, false);
//     } 

//     return done(null,user);

// }))

// passport.use('register', new LocalStrategy({passReqToCallback:true}, async (req, username, password, done) => {
//     const { email } = req.body;
//     const user = await UserService.find(username);
//     if (user){
//         return done('User already exist');
//     } 
//     const newUser = await UserService.create({ username, email, password});
//     return done(null, newUser);
// }))


passport.use(new FacebookStrategy({
    clientID:"496117064774752", 
    clientSecret:"d0619cb53fa5e4723ce3b381e3d1c013",
    callbackURL: 'http://localhost:8080/auth/fb/callback'},
    async (accessesToken, refreshhToken, profile, done) => {
        const user = await UserService.find("nosemimail@gmail.com");
        if (!user){
            return done(null, false);
        } 
        return done(null,user);
    }
))

passport.serializeUser( (user, done) => {
    done(null, user.username);
})

passport.deserializeUser( async (username, done) => {
    const user = await UserService.find(username);
    done(null, user);
})

const isAuth = (req, res, next) => {
    if (req.isAuthenticated()){ 
        next();
    }else {
        res.render('login');
    }
} 

webRoute.get('/auth/fb', passport.authenticate('facebook'));
webRoute.get('/auth/fb/callback', passport.authenticate('facebook', {failureRedirect:'/auth/fb', successRedirect:'/chat'}));

webRoute.get('/register', WebController.sendRegister);
webRoute.post('/register', passport.authenticate('register', {failureRedirect:'/failregister', successRedirect:'/'}));
webRoute.get('/failregister', WebController.sendFailRegister);
webRoute.get('/login', WebController.sendLogin);
webRoute.post('/login', passport.authenticate('login', {failureRedirect:'/faillogin', successRedirect:'/chat'}));
webRoute.get('/faillogin', WebController.sendFailLogin);
webRoute.get('/chat', isAuth, WebController.sendIndex);
webRoute.get('/logout', WebController.sendLogout);
webRoute.get('/', WebController.sendIndex);