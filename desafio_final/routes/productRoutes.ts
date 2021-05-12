import express, { Router } from 'express';
import { ProductList } from '../models/productList';
import { Product } from '../models/product';

export const productRouter: Router = express.Router();
productRouter.use(express.json());
productRouter.use(express.urlencoded({ extended: false }));

const productList: ProductList = ProductList.Instance;

productRouter.get('', (req, res) => {
    res.json(productList.list);
});

productRouter.get('/:id/show', (req, res) => {
    res.json(productList.getById(req.params.id));
});

productRouter.post('/', (req, res) => {
    //TO-DO: implement schema validatiom https://stackoverflow.com/questions/44755315/spread-operator-form-submission-in-express-js
    const newProduct: Product = req.body as Product;
    productList.addProduct(newProduct);
    res.status(200).json("Created");
});

productRouter.put('/:id', (req, res) => {
    //TO-DO: implement schema validatiom https://stackoverflow.com/questions/44755315/spread-operator-form-submission-in-express-js
    const newProduct: Product = req.body as Product;
    try {
        productList.updateProduct(req.params.id, newProduct);
        res.status(200).json("Updated");
    } catch (e) {
        res.status(404).json(e.message);
    }

});

productRouter.delete('/:id', (req, res) => {
    try {
        productList.removeProduct(req.params.id);
        res.status(200).json("Deleted");
    } catch (e) {
        res.status(404).json(e.message);
    }
});
