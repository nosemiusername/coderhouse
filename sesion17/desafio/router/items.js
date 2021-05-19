import express, { Router } from 'express';
import Item from '../api/item.js';
import { sqlite3 as config } from '../config/db.js';

export const itemRoute = Router();
itemRoute.use(express.json());
const item = new Item(config);
const result = { };

try {
    await item.createTable();
    result.status = 1;
} catch (e) {
    console.log(e.message);
    result.status = 0;
}


itemRoute.post('/update/:id', (req, res) => { 
    if (result.status){

    } else {
        res.status(404).json("DB Error");
    }
})


itemRoute.delete('/:id', (req, res) => {
    if (result.status){

    } else {
        res.status(404).json("DB Error");
    }
})

itemRoute.post('/add', (req, res) => {
    if (result.status){
        console.log(req.body);
        item.insertTable(req.body);
    } else {
        res.status(404).json("DB Error");
    }
})

itemRoute.get('/', async (req, res) => {
    if (result.status){
        res.status(200).json("DB Ok");

    } else {
        res.status(404).json("DB Error");
    }
})
