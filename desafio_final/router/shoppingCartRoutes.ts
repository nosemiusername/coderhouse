import express, { Router } from 'express';
import { ProductList } from '../api/productList';
import { Product } from '../api/product';
import { isAdmin } from '../helper/functions';

export const shoppingCartRouter: Router = express.Router();
shoppingCartRouter.use(express.json());
shoppingCartRouter.use(express.urlencoded({ extended: false }));

const productList: ProductList = ProductList.Instance;

shoppingCartRouter.get('', (req, res) => {
    res.json(productList.list);
});

shoppingCartRouter.get('/:id/show', (req, res) => {
    const product = productList.getById(req.params.id)[0];
    if (product) {
        res.status(200).json(product);
    } else {
        res.status(404).json("Product not found");
    }

});

shoppingCartRouter.post('/', (req, res) => {
    //TO-DO: implement schema validatiom https://stackoverflow.com/questions/44755315/spread-operator-form-submission-in-express-js
    const idProduct: string = req.body.id;
    productList.addProduct(idProduct);
    res.status(200).json("Created");

});

shoppingCartRouter.delete('/:id', (req, res) => {
    try {
        productList.removeProduct(req.params.id);
        res.status(200).json("Deleted");
    } catch (e) {
        res.status(404).json(e.message);
    }
}

);
