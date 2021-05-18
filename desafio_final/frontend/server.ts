import express, { Application } from 'express';
import {cartRouter} from './route/cart';
import {productRouter} from './route/product';
import {obtainProducts} from './helper/functions';

const app: Application = express();
const PORT: number = 3000;

app.use(express.json());
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', './view');
app.get('/', async (req, res) => {   
    const products:any = await obtainProducts();
    res.render('index', { products: products.data });
});

app.get('/admin', async (req, res) => {
    const products:any = await obtainProducts();
    res.render('admin', { products: products.data });
});

app.use('/product', productRouter);
app.use('/cart', cartRouter);

app.listen(PORT);


