import { ItemService } from "../services/itemService.js";

export class ItemController {
    static create(cant) {
        ItemService.create(cant);
    }

    static async search() {
        const items = await ItemService.findAll();
        return items;
    }

    static generateItems(req, res, next) {
        const cant = req.query.cant || 1;
        ItemController.create(cant);
        res.json('ok');
    }
}