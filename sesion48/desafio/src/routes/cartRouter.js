import { ItemController } from '../controllers/itemController.js';
import { Router } from 'express';
import config from '../config/index.js';

export class CartRouter {
    constructor() {
        this.itemController = new ItemController(config.flagDB);
        this.router = Router();
    }

    start() {
        this.router.put('/:id', this.itemController.updateItem);
        this.router.delete('/:id', this.itemController.delete);
        this.router.post('', this.itemController.create);
        this.router.get('', this.itemController.getAllItems);
        this.router.get('/:id', this.itemController.getItem);

        return this.router;
    }
}

