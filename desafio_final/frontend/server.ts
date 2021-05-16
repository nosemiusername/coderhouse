import express, { Application } from 'express';
import axios from 'axios';
import { calculateCart } from './helper/functions';
import { Product } from './model/product';


const app: Application = express();
const PORT: number = 3000;

app.use(express.json());
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', './view');
app.get('/', async (req, res) => {

    const products = await axios({
        method: 'get',
        url: 'https://exciting-efficient-roquefort.glitch.me/api/productos',
        headers: {
            'auth-token': '123456'
        }
    });
    res.render('index', { products: products.data });
});

app.get('/cart/:idCart/show', async (req, res) => {

    const cart = await axios({
        method: 'get',
        url: `https://exciting-efficient-roquefort.glitch.me/api/carrito/${req.params.idCart}/show`,
    });
    const sum = cart.data._productList.map((element: any) => element._price)
        .reduce((accum: number, actual: number) => accum + actual, 0);

    const response = {
        sum: sum,
        length: cart.data._productList.length,
        ...
        cart.data
    }
    res.json(response);

});

app.post('/cart/:idCart/add', async (req, res) => {

    const addResult = await axios({
        method: 'post',
        url: `https://exciting-efficient-roquefort.glitch.me/api/carrito/${req.params.idCart}`,
        data: req.body
    });

    res.status(200).json({status:"ok"});

});

app.delete('/cart/:idCart/remove/:idProduct', async (req, res) => {
    const cart = await axios({
        method: 'delete',
        url: `https://exciting-efficient-roquefort.glitch.me/api/carrito/${req.params.idCart}/delete/${req.params.idProduct}`,
    });
    console.log(cart.data);
    res.status(200).json({status:"ok"});

});

app.listen(PORT);


