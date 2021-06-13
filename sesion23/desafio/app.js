import { Server as httpServer } from 'http';
import express from 'express';
import { Server as ioServer } from 'socket.io';
import mongoose from 'mongoose';
import config from './config/index.js';
import { itemRoute } from './router/item.routes.js';
import { MessageController } from './controllers/message.controller.js';

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true, useUnifiedTopology: true
}).then(res => console.log(`Connection Succesful ${res}`))
    .catch(err => console.log(`Error in DB connection ${err}`));

const app = express();
const http = new httpServer(app);
const io = new ioServer(http);
const PORT = config.port;

app.use(express.json());
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', './views');
app.use('/api', itemRoute);
app.use('/', (req, res, next) => {
    res.render('chat');
})

io.on('connection', (socket) => {
    console.log("New Connection");

    MessageController.getAllChats()
        .then(chats => {
            console.log(chats);
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
