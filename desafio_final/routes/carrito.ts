import express, { Router } from 'express';
import { Carrito } from '../models/shoppingCart'
export const carritoRoutes:Router = express.Router();

carritoRoutes.get('', () => {

});
carritoRoutes.get(':id/show', () => {});
carritoRoutes.post('', () => {});
carritoRoutes.put(':id', () => {});
carritoRoutes.delete(':id', () => {});

