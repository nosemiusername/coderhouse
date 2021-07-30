import { ItemService } from "../services/itemService.js";

export class ItemController {
    static create(cant) {
        ItemService.create(cant);
    }

    static async search() {
        const items = await ItemService.findAll();
        return items;
    }

}