import { ItemController } from '../controllers/itemController.js';
import { Router } from 'express';
import config from '../config/index.js';

export class ItemRouter {
    constructor() {
        this.itemController = new ItemController(config.flagDB);
        this.router = Router();
        this.protectedRouter = Router();
    }

    start() {
        this.protectedRouter.use(this.itemController.verify);
        this.router.post('/login', this.itemController.login);
        this.router.put('/:id', this.protectedRouter, this.itemController.updateItem);
        this.router.delete('/:id', this.protectedRouter, this.itemController.delete);
        this.router.post('', this.protectedRouter, this.itemController.create);
        this.router.get('', this.protectedRouter, this.itemController.getAllItems);
        this.router.get('/:id', this.protectedRouter, this.itemController.getItem);
        this.router.get('/generar/:quantity', this.protectedRouter, this.itemController.generate);

        return this.router;
    }
}

