import express, { Application } from 'express';
import {carritoRoutes} from './routes/carrito';
import {productosRoutes} from './routes/productos';

const app:Application = express();
app.use('/api/carrito',carritoRoutes);
app.use('/api/productos',productosRoutes);

app.listen(process.env.PORT || 3000);

