import express, { Router } from 'express';
import { ProductList } from '../models/productList';
import { Product } from '../models/product';

export const productosRoutes: Router = express.Router();
const productList: ProductList = new ProductList();

productosRoutes.get('', (req, res) => {
    res.json(productList.list);
});

productosRoutes.get(':id/show', (req, res) => {
    res.json(productList.getById(req.params.id));
});

productosRoutes.post('', (req, res) => {
    //TO-DO: implement schema validatiom https://stackoverflow.com/questions/44755315/spread-operator-form-submission-in-express-js
    const newProduct: Product = req.body as Product;
    productList.addProduct(newProduct);
    res.status(200).json("Created");
});

productosRoutes.put(':id', (req, res) => {
    //TO-DO: implement schema validatiom https://stackoverflow.com/questions/44755315/spread-operator-form-submission-in-express-js
    const newProduct: Product = req.body as Product;
    productList.updateProduct(req.params.id, newProduct);
    res.status(200).json("Created");
});

productosRoutes.delete(':id', (req, res) => {
    productList.removeProduct(req.params.id);
 });

