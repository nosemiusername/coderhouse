import express, { Router } from 'express';
import { ProductList } from '../api/productList';
import { ShoppingCartList } from '../api/shoppingCartList';

export const shoppingCartRouter: Router = express.Router();
shoppingCartRouter.use(express.json());
shoppingCartRouter.use(express.urlencoded({ extended: false }));
const shoppingCartList: ShoppingCartList = ShoppingCartList.Instance;

shoppingCartRouter.get('', (req, res) => {
    res.json(shoppingCartList.list);
});

// shoppingCartRouter.get('/:uid/show', (req, res) => {
//     const shoppingCart = shoppingCartList.getByUid(req.params.uid)[0];
//     if (shoppingCart) {
//         res.status(200).json(shoppingCart);
//     } else {
//         res.status(404).json("ShoppingCart not found");
//     }
// });

// shoppingCartRouter.post('/', (req, res) => {
//     //TO-DO: implement schema validatiom https://stackoverflow.com/questions/44755315/spread-operator-form-submission-in-express-js
//     const idProduct: string = req.body.id;
//     const uid: string = req.body.uid;
//     shoppingCartList.addProductToCart(uid, idProduct);
//     res.status(200).json("Created");

// });

// shoppingCartRouter.delete('/:uid/delete/:id', (req, res) => {
//     try {
//         shoppingCartList.removeProduct(req.params.uid, req.params.id);
//         res.status(200).json("Deleted");
//     } catch (e) {
//         res.status(404).json(e.message);
//     }
// }

