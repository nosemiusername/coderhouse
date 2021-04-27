import express from 'express';
import { apiRoute } from './apiRoutes'
import handlebars from 'express-handlebars';
import { Producto } from './Producto';

const app = express();
const PORT = 3000;
const product = Producto.Instance;

app.set('view engine', 'ejs');
app.set('views', './productos/vista');
app.get('/', (req, res) => {
    res.render('addProducts');
})
app.get('/list', (req, res) => {
    const listProducts = product.list;
    const hasProducts = product.list.length > 0 ? true : false;
    res.render('listProducts', {hasProducts:hasProducts, listProducts:listProducts});
})
app.use(express.static('public'));
app.use('/api', apiRoute);
app.listen(PORT);
