import {Router} from 'express';
import WebController from '../controllers/web.controller.js'
export const webRoute = Router();
import passport, { Passport } from 'passport';
import { Strategy as LocalStrategy } from 'passport-local'
import UserService from '../services/userService.js'

passport.use('login', new LocalStrategy((name, password, done) => {
    const user = UserService.find(name, password)
    if (!user){
        return done(null, false);
    } 

    return done(null,user);

}))

passport.use('register', new LocalStrategy({passReqToCallback:true}, async (req, username, password, done) => {
    const { email } = req.body;
    const user = UserService.find(username);
    if (user){
        return done('User already exist');
    } 
    user = { ... user, name, password};
    const newUser = await UserService.create(user);
    return done(null, newUser);
}))

passport.serializeUser( (user, done) => {
    done(null, user.name);
})

passport.deserializeUser((name, done) => {
    const user = UserService.find(name);
})

const isAuth = (req, res, next) => {
    if (req.isAuthenticated()){ 
        next();
    }else {
        res.render('login');
    }
} 

webRoute.get('/register', WebController.sendRegister)
webRoute.post('/register', passport.authenticate('register', {failureRedirect:'/failregister', successRedirect:'/chat'}));
webRoute.get('/failregister', WebController.sendFailRegister);
webRoute.get('/login', WebController.sendLogin);
webRoute.post('/login', passport.authenticate('login', {failureRedirect:'/faillogin', successRedirect:'/chat'}));
webRoute.get('/faillogin', WebController.sendFailLogin);
webRoute.get('/chat', isAuth, WebController.sendIndex);
webRoute.get('/logout', WebController.sendLogout);
webRoute.get('/', WebController.sendLogin);