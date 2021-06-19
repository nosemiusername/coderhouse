import {Router} from 'express';
import config from '../config/index.js';

export const webRoute = Router(); 

webRoute.get('/login', (req, res, next) => {
    res.render('login');
})
webRoute.post('/login', (req, res, next) => {
    if (config.loginPass == req.body.pass && config.loginUser == req.body.user) {
        req.session.user = req.body.user;
        res.render('chat', {user:req.session.user});
    } else {
        res.render('login');
    }
})
webRoute.get('/chat', (req, res, next) => {
    res.render('chat', {user:req.session.user});
})
webRoute.get('/logout', (req, res, next) => {
    req.session.destroy();
    res.render('login');
})
webRoute.get('/', (req, res, next) => {
    res.render('login');
})