import express, { Router } from 'express';
import { Carrito } from '../api/shoppingCart'
export const shoppingCartRouter:Router = express.Router();

shoppingCartRouter.get('', () => {

});
shoppingCartRouter.get('/:id/show', () => {});
shoppingCartRouter.post('/', () => {});
shoppingCartRouter.put('/:id', () => {});
shoppingCartRouter.delete('/:id', () => {});

