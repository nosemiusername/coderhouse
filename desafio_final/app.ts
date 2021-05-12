import express, { Application } from 'express';
import {shoppingCartRouter} from './routes/shoppingCartRoutes';
import {productRouter} from './routes/productRoutes';

const app:Application = express();
app.use('/api/carrito',shoppingCartRouter);
app.use('/api/productos',productRouter);
app.all('/*', (req, res) => {
    res.json({error:-2, descripcion: `ruta ${req.url} metodo ${req.method} no implementado`});
})
app.listen(process.env.PORT || 8080);



