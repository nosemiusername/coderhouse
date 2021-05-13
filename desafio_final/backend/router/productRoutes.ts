import express, { Router } from 'express';
import { ProductList } from '../api/productList';
import { Product } from '../api/product';
import { isAdmin } from '../helper/functions';

export const productRouter: Router = express.Router();
productRouter.use(express.json());
productRouter.use(express.urlencoded({ extended: false }));

const productList: ProductList = ProductList.Instance;

productRouter.get('', (req, res) => {
    if (isAdmin(req.headers)) {
        res.json(productList.list);
    } else {
        res.status(403).json({ error: -2, descripcion: `ruta ${req.url} metodo ${req.method} no autorizada` });
    }
});

productRouter.get('/:id/show', (req, res) => {
    if (isAdmin(req.headers)) {
        const product = productList.getById(req.params.id)[0];
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json("Product not found");
        }
    } else {
        res.status(403).json({ error: -2, descripcion: `ruta ${req.url} metodo ${req.method} no autorizada` });
    }
});

productRouter.post('/', (req, res) => {
    if (isAdmin(req.headers)) {
        //TO-DO: implement schema validatiom https://stackoverflow.com/questions/44755315/spread-operator-form-submission-in-express-js
        const newProduct: Product = req.body as Product;
        productList.addProduct(newProduct);
        res.status(200).json("Created");
    } else {
        res.status(403).json({ error: -2, descripcion: `ruta ${req.url} metodo ${req.method} no autorizada` });
    }
});

productRouter.put('/:id', (req, res) => {
    if (isAdmin(req.headers)) {
        //TO-DO: implement schema validatiom https://stackoverflow.com/questions/44755315/spread-operator-form-submission-in-express-js
        const newProduct: Product = req.body as Product;
        try {
            productList.updateProduct(req.params.id, newProduct);
            res.status(200).json("Updated");
        } catch (e) {
            res.status(404).json(e.message);
        }

    }else {
        res.status(403).json({ error: -2, descripcion: `ruta ${req.url} metodo ${req.method} no autorizada` });
    }
    
});

productRouter.delete('/:id', (req, res) => {
    if (isAdmin(req.headers)) {
        try {
            productList.removeProduct(req.params.id);
            res.status(200).json("Deleted");
        } catch (e) {
            res.status(404).json(e.message);
        }
    }
    else {
        res.status(403).json({ error: -2, descripcion: `ruta ${req.url} metodo ${req.method} no autorizada` });
    }
});
