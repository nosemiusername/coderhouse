import factory from '../services/itemService.js';
export default class ItemController {

    static async apiUpdateItem(req, res, next) {
        try {
            const itemList = await factory.item.crud.updateItem(req.params.id, req.body);
            res.status(200).json(itemList);
        } catch (error) {
            console.error(error);
            res.status(404).json(error);
        }
    };

    static async apiDeleteItem(req, res, next) {
        try {
            const itemList = await factory.item.crud.deleteItem(req.params.id);
            res.status(200).json(itemList);
        } catch (error) {
            res.status(404).json(error);
        }
    };

    static async apiCreateItem(req, res, next) {
        try {
            const itemList = await factory.item.crud.insertItem(req.body);
            res.status(200).json(itemList);
        } catch (error) {
            res.status(404).json(error);
        }
    };

    static async apiGetAllItems(req, res, next) {
        try {
            const itemList = await factory.item.crud.getAllItems();
            res.status(200).json(itemList);
        } catch (error) {
            res.status(404).json(error);
        }
    };

    static async apiGetItemsByID(req, res, next) {
        try {
            console.log(req.params.id);
            const itemList = await factory.item.crud.getItemByID(req.params.id);
            res.status(200).json(itemList);
        } catch (error) {
            res.status(404).json(error);
        }
    };

}