import express from 'express';
import { Producto } from './Producto'


export const apiRoute = express.Router();
apiRoute.use(express.json());
apiRoute.use(express.urlencoded({ extended: false })); 
const products = new Producto();

/**
 * Listar en forma total
 */
apiRoute.get('/productos', (req, res) => {
    const listOfProducts = products.list;
    let status = 200;
    let result;

    if (listOfProducts.length) {
        status = 200
        result = listOfProducts;
    } else {
        status = 404;
        result = { 'error': 'no hay productos cargados' };
    }

    res.status(status).json(result);
})

/**
 * Eliminar producto
 */
apiRoute.delete('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let status = 200;
    let result = {};

    if (isNumber(id)) {
        console.log(products.isExist(id) );
        if ( products.isExist(id) ) {
            products.removeProduct(id);
            status = 200;
            result = { 'mensaje': 'producto eliminado' };        
        }
        else {
            status = 404;
            result = { 'error': 'producto no encontrado' };
        }

    } else {
        status = 404;
        result = { 'error': 'valor no valido de id de producto' };
    }
    res.status(status).json(result);
})

/**
 * Update producto
 */
 apiRoute.put('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let status = 200;
    let result = {};

    if (isNumber(id)) {
        console.log(products.isExist(id) );
        if ( products.isExist(id) ) {
            products.updateProduct(id, req.body);
            status = 200;
            result = { 'mensaje': 'producto actualizado' };        
        }
        else {
            status = 404;
            result = { 'error': 'producto no encontrado' };
        }

    } else {
        status = 404;
        result = { 'error': 'valor no valido de id de producto' };
    }
    res.status(status).json(result);
})

/**
 * Almacenar productos
 */
apiRoute.post('/productos', (req, res) => {
    products.list = req.body;
    console.log(req.body);
    res.status(200).json({ 'message': 'producto cargado correctamente' });
})

const isNumber = (value: any) => {
    return !isNaN(value);
}
