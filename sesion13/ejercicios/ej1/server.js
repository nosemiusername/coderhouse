import express from 'express';
import path  from 'path';
import {Server as HttpServer} from 'http';
import {Server as IOServer} from 'socket.io';


const __dirname = path.resolve();
const app = express();
const httpServer  = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get('/',(req, res) => {
    res.sendFile(path.join(__dirname+'/views/index.html'));
})

httpServer.listen(8080, () => console.log('SERVER ON'));
const messages = [];
io.on('connection', socket => {
    console.log('¡Nuevo cliente conectado!');

    /* Envio los mensajes al cliente que se conectó*/
    socket.emit('messages', messages);

    /*Escucho los mensajes enviados por el cliente y se los propago a todos*/
    socket.on('new-messages', data => {
        messages.push(data);
        console.log(messages);
        io.sockets.emit('messages', messages);
    });
});

 