import { Router } from 'express';
import { ItemController } from '../controllers/itemController.js';

export const apiRouter = Router();

apiRouter.get('/products', async (req, res, next) => {
    try {
        const items = await ItemController.search();
        res.status(200).json(items);
    } catch (error) {
        res.status(501).json('Internal server Error');
    }
});


apiRouter.get('/product/:productname', async (req, res, next) => {
    try {
        const items = await ItemController.search(req.params.productname);
        res.status(200).json(items);
    } catch (error) {
        res.status(501).json('Internal server Error');
    }
});