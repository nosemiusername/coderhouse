import express, { Router } from 'express';
import ItemController from '../controllers/item.controller.js';

export const itemRoute = Router();
itemRoute.use(express.json());
const result = {};

itemRoute.put('/:id', ItemController.apiUpdateItem);
itemRoute.delete('/:id', ItemController.apiDeleteItem);
itemRoute.post('/add', ItemController.apiCreateItem);
itemRoute.get('/list', ItemController.apiGetAllItems);
itemRoute.get('/:id/show', ItemController.apiGetItemsByID);
itemRoute.get('/productos/vista-test',ItemController.apiGenerate)
