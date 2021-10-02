import { Router } from 'express';
import passport from 'passport';
import config from '../config/index.js'
import { Strategy as LocalStrategy } from 'passport-local';;
import { WebController } from '../controllers/webController.js';
import { UserController } from '../controllers/userController.js';
import { CartController } from '../controllers/cartController.js';

passport.use('login', new LocalStrategy(async (username, password, done) => {
    const user = await UserController.find(username, password);
    if (user) {
        return done(null, user);
    } else {
        return done(null, false);
    }
}))

passport.use('signup', new LocalStrategy({ passReqToCallback: true }, async (req, username, password, done) => {
    const { age, address, email, cellphone } = req.body;
    const user = await UserController.find(username);
    if (user) {
        return done('User already exist');
    }
    const newuser = await UserController.create({ username, password, age, address, email, cellphone });
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
        res.render('login.ejs');
    }
}
export class WebRouter {
    constructor() {
        this.cartController = new CartController(config.flagDB);
        this.webController = new WebController();
        this.webRouter = Router();
    }

    start() {

        this.webRouter.post('/register', passport.authenticate('signup', { failureRedirect: '/failregister' }), this.webController.sendProductos);;
        this.webRouter.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), this.webController.sendProductos);
        this.webRouter.get('/failregister', this.webController.failRegister);
        this.webRouter.get('/faillogin', this.webController.failLogin);
        this.webRouter.get('/logout', this.webController.sendIndex);
        this.webRouter.post('/addcart', this.cartController.add);
        this.webRouter.post('/carrito/:productId', this.cartController.updateCart);
        this.webRouter.get('/carrito', this.cartController.search);
        this.webRouter.post('/paycart', this.cartController.pay);
        this.webRouter.post('/removecart', this.cartController.remove);
        this.webRouter.get('/productos', this.webController.sendProductos);
        this.webRouter.get('/productos/:id', this.webController.sendProductos);
        this.webRouter.get('/profile', this.webController.sendProfile);
        this.webRouter.get('/info', this.webController.sendInfo);
        this.webRouter.get('/enviroment', this.webController.enviroment);
        this.webRouter.get('/chat', this.webController.chat);
        this.webRouter.get('/chat/:email', this.webController.chat);
        this.webRouter.get('/', this.webController.sendIndex);

        return this.webRouter;

    }


}