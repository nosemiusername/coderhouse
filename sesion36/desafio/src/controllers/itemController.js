import { ItemService } from "../services/itemService.js";

export class ItemController {
    static create(cant) {
        ItemService.create(cant);
    }

}