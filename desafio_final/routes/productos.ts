import express, { Router } from 'express';

export const productosRoutes:Router = express.Router();

productosRoutes.get('', () => {
    
});
productosRoutes.get(':id/show', () => {});
productosRoutes.post('', () => {});
productosRoutes.put(':id', () => {});
productosRoutes.delete(':id', () => {});

