import express from 'express';
import { apiRoute } from './apiRoutes'
import handlebars from 'express-handlebars';
import { Producto } from './Producto';
import { Server as httpServer} from 'http';
import { Server as ioServer} from 'socket.io';

const app = express();
const PORT = 3000;
const product = Producto.Instance;
const http = new httpServer(app);
const io = new ioServer(http);

app.set('view engine', 'ejs');
app.set('views', './productos/vista');
app.get('/', (req, res) => {
    const listProducts = product.list;
    const hasProducts = product.list.length > 0 ? true : false;
    res.render('addProducts',{hasProducts:hasProducts, listProducts:listProducts});
});

app.use(express.static('public'));
app.use('/api', apiRoute);
http.listen(PORT);

io.on('connection', (socket) => {
    socket.emit('mensaje', product.list);

    socket.on('mensaje', data => {
        product.list = data;
        socket.emit('mensaje', product.list);
    })
})

