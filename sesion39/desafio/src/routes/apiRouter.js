import { Router } from 'express';
import { ItemController } from '../controllers/itemController.js';

export const apiRouter = Router();

apiRouter.post('/product/create', ItemController.create);
apiRouter.get('/products', ItemController.search);
apiRouter.get('/product/:id/show', ItemController.search);
apiRouter.get('/product/generate/:cant', ItemController.generate);
apiRouter.put('/product/:id/update', ItemController.update);
