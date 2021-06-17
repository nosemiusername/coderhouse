import { Server as httpServer } from 'http';
import express from 'express';
import { Server as ioServer } from 'socket.io';
import mongoose from 'mongoose';
import config from './config/index.js';
import { itemRoute } from './router/item.routes.js';
import { MessageController } from './controllers/message.controller.js';
import session from 'express-session';
import cookieParser from 'cookie-parser';

import bcrypt from 'bcrypt';
import passport  from 'passport'
import {Strategy as LocalStrategy} from 'passport-local';

const app = express();
const http = new httpServer(app);
const io = new ioServer(http);
const PORT = config.port;

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.urlencoded());
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());
app.use(session({
    secret: 'coderhouse',
    resave: true,
    saveUninitialized: true,
}))
app.use('/api', itemRoute);

const users = [];

passport.use('login', new LocalStrategy ({
    passReqToCallback: true,} ,
    (req, username, password, done) => {
        User.findOne({'username':username},
        (err, user) => {
            if(err) return done(err);
            if (!usr){
                console.log("not found");
                return done(null, false);
            }
            if (!isValidPassword(user, password)){
                return done(null, false);
            }

            return done(null, user);
        });

    }
));


const isValidPassword = 

app.get('/', (req, res, next) => {
    res.render('login');
})
app.get('/register', (req, res, next) => {
    res.render('register');
})
app.post('/save', (req, res, next) => {
    const { user, name, pass } = req.body;
    users.push({user, name, pass});
    req.session.user = user.name;
    res.render('chat', { user: req.session.user });
})
app.post('/login', (req, res, next) => {
    const {user, pass} = req.body;
    const userFound = users.find(user => user.user == user && user.pass == pass);
    if (userFound) {
        req.session.user = user.name;
        res.render('chat', { user: req.session.user });
    } else {
        res.render('login');
    }
})
app.get('/chat', auth, (req, res, next) => {
    res.render('chat', { user: req.session.user });
})
app.get('/logout', (req, res, next) => {
    req.session.destroy();
    res.render('login');
})

io.on('connection', (socket) => {
    console.log("New Connection");

    MessageController.getAllChats()
        .then(chats => {
            socket.emit('chats', chats);
        })

    socket.on('new-chat', data => {
        const chat = MessageController.createMessage(data);
        io.sockets.emit('chats', chat);
    })
})

http.listen(PORT, () => {
    console.log(`Application is listening at port ${PORT}`)
});
