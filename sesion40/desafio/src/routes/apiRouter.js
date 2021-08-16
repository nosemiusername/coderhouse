import { Router } from 'express';
import { ItemController } from '../controllers/itemController.js';
import config from '../config/index.js'

export const apiRouter = Router();
const itemController = new ItemController(config.flagDB);

apiRouter.post('/product/create', (req, res, next) => itemController.create(req, res, next));
apiRouter.get('/products', (req, res, next) => itemController.search(req, res, next));
apiRouter.get('/product/:id/show', (req, res, next) => itemController.search(req, res, next));
apiRouter.get('/product/generate/:cant', (req, res, next) => itemController.generate(req, res, next));
apiRouter.put('/product/:id/update', (req, res, next) => itemController.update(req, res, next));
