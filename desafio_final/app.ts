import express, { Application } from 'express';
import {shoppingCartRouter} from './router/shoppingCartRoutes';
import {productRouter} from './router/productRoutes';

const app:Application = express();
app.use('/api/carrito',shoppingCartRouter);
app.use('/api/productos',productRouter);
app.all('/*', (req, res) => {
    res.status(404).json({error:-2, descripcion: `ruta ${req.url} metodo ${req.method} no implementado`});
})
app.listen(process.env.PORT || 8080);



