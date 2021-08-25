import { Router } from 'express';
import WebController from '../controllers/web.controller.js'

export default class WebRouter {

    constructor() {
        this.webController = new WebController();
        this.router = Router();
    }

    start() {
        this.router.post('/', this.webController.save);
        return this.router;
    }
}



