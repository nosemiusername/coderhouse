import express, { Router } from 'express';
import ItemService from '../controllers/item.controller';

export const itemRoute = Router();
itemRoute.use(express.json());
const result = {};

itemRoute.put('/:id', async (req, res) => {
    if (result.status) {
        await ItemService.updateItem(req.params.id, req.body);
        res.status(200).json(result);
    } else {
        res.status(404).json("DB Error");
    }
});


itemRoute.delete('/:id', async (req, res) => {
    try {
    if (result.status) {
        await ItemService.deleteItem(req.params.id);
        res.status(200).json(result);
    } else {
        res.status(404).json("DB Error");
    }
    }catch (e) {
        res.status(404).json(e.message);
    }
});

itemRoute.post('/add', async (req, res) => {
    if (result.status) {
        await ItemService.insertItem(req.body);
        res.status(200).json(result);
    } else {
        res.status(404).json("DB Error");
    }
});


itemRoute.get('/list', async (req, res) => {
    if (result.status) {
        const itemList = await ItemService.selectAllItems();
        res.status(200).json(itemList);
    } else {
        res.status(404).json("DB Error");
    }
});


itemRoute.get('/:id/show', async (req, res) => {
    if (result.status) {
        const itemList = await ItemService.selectItemByID(req.params.id);
        res.status(200).json(itemList);
    } else {
        res.status(404).json("DB Error");
    }
});

itemRoute.get('/', async (req, res) => {
    if (result.status) {
        res.status(200).json("DB Ok");
    } else {
        res.status(404).json("DB Error");
    }
});
