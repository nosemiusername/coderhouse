import express from 'express';
import { itemRoute } from './router/item.routes.js';
import config from './config/index.js';
import mongoose from 'mongoose';
import { Server as ioServer } from 'socket.io';

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
app.use(express.json());
app.use(express.static('public'));
app.use('/api', itemRoute);
app.use('/', (req, res, next) => {
    res.render('./views/index.ejs');
})

//TODO implementar control de errores
app.listen(PORT, () => {
    console.log(`Application is listening at port ${PORT}`)
});

io.on('connection', (socket) => {
    console.log("New Connection");

    socket.emit('chats', chats);

    socket.on('new-chat', data => {
        const chat = {
            time: new Date(),
            ... data
        }
        chats.push(chat);
        io.sockets.emit('chats',chats);
    })
})
