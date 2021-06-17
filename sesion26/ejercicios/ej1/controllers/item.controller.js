import ItemService from '../services/itemService.js';
export default class Item {

    static async apiUpdateItem(req, res, next) {
        try {
            const itemList = await ItemService.updateItem(req.params.id, req.body);
            res.status(200).json(itemList);
        } catch (error) {
            console.error(error);
            res.status(404).json(error);
        }
    };

    static async apiDeleteItem(req, res, next) {
        try {
            const itemList =await ItemService.deleteItem(req.params.id);
            res.status(200).json(itemList);
        } catch (error) {
            res.status(404).json(error);
        }
    };

    static async apiCreateItem(req, res, next) {
        try {
            const itemList = await ItemService.insertItem(req.body);
            res.status(200).json(itemList);
        } catch (error) {
            res.status(404).json(error);
        }
    };

    static async apiGetAllItems(req, res, next) {
        try {
            const itemList = await ItemService.getAllItems();
            res.status(200).json(itemList);
        } catch (error) {
            res.status(404).json(error);
        }
    };

    static async apiGetItemsByID(req, res, next) {
        try {
            console.log(req.params.id);
            const itemList = await ItemService.getItemByID(req.params.id);
            res.status(200).json(itemList);
        } catch (error) {
            res.status(404).json(error);
        }
    };

    static apiGenerate(req, res, next){
        try {
            const itemList = ItemService.generateItem(req.query.cant);
            res.status(200).json(itemList);
        }catch (error){
            res.status(404).json(error);
        }
    }

}