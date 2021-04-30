import express from 'express';
import { apiRoute } from './apiRoutes'
import handlebars from 'express-handlebars';
import { Producto } from './Producto';
import { Server as httpServer} from 'http';
import { Server as ioServer} from 'socket.io';

const app = express();
const PORT = 3000;
const product = Producto.Instance;
const chats = Array();
const http = new httpServer(app);
const io = new ioServer(http);

app.set('view engine', 'ejs');
app.set('views', './productos/vista');
app.get('/', (req, res) => {
    res.render('addProducts');
});

app.use(express.static('public'));
app.use('/api', apiRoute);
http.listen(PORT);

io.on('connection', (socket) => {
    console.log("New Connection");
    socket.emit('products', product.list);
    socket.emit('chats', chats);

    socket.on('new-product', data => {
        product.list = data;
        io.sockets.emit('products', product.list);
    });

    socket.on('new-chat', data => {
        const chat = {
            time: new Date(),
            ... data
        }
        chats.push(chat);
        io.sockets.emit('chats',chats);
    })
})

