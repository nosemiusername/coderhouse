import { Server as httpServer } from 'http';
import express from 'express';
import { Server as ioServer } from 'socket.io';
import mongoose from 'mongoose';
import config from './config/index.js';
import { itemRoute } from './router/item.routes.js';
import { MessageController } from './controllers/message.controller.js';
import session from 'express-session';
import cookieParser from 'cookie-parser';

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true, useUnifiedTopology: true
}).then(res => console.log(`Connection Succesful ${res}`))
    .catch(err => console.log(`Error in DB connection ${err}`));

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

const auth = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    } else {
        return res.render('login');
    }
}

app.get('/', (req, res, next) => {
    res.render('login');
})
app.post('/login', (req, res, next) => {
    if (config.loginPass == req.body.pass && config.loginUser == req.body.user) {
        req.session.user = req.body.user;
        res.render('chat', {user:req.session.user});
    } else {
        res.render('login');
    }
})
app.get('/chat', auth, (req, res, next) => {
    res.render('chat', {user:req.session.user});
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
