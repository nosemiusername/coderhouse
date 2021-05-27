import express, { Router } from 'express';
import Item from '../models/item.js';
import config from '../config/index.js';

export const itemRoute = Router();
itemRoute.use(express.json());
const item = new Item(config.sqlite);
const result = {};

try {
    await item.createTable();
    result.status = 1;
} catch (e) {
    console.log(e.message);
    result.status = 0;
}


itemRoute.put('/:id', async (req, res) => {
    if (result.status) {
        await item.updateTable(req.params.id, req.body);
        res.status(200).json(result);
    } else {
        res.status(404).json("DB Error");
    }
});


itemRoute.delete('/:id', async (req, res) => {
    try {
    if (result.status) {
        await item.deleteTable(req.params.id);
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
        await item.insertTable(req.body);
        res.status(200).json(result);
    } else {
        res.status(404).json("DB Error");
    }
});


itemRoute.get('/list', async (req, res) => {
    if (result.status) {
        const itemList = await item.selectTable();
        res.status(200).json(itemList);
    } else {
        res.status(404).json("DB Error");
    }
});


itemRoute.get('/:id/show', async (req, res) => {
    if (result.status) {
        const itemList = await item.selectTableByID(req.params.id);
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
