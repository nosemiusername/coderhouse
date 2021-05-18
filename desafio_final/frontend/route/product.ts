import axios from 'axios';
import express, { Router } from 'express';
import { obtainProductById } from '../helper/functions';

export const productRouter = Router();
productRouter.use(express.json());
productRouter.use(express.static('public'));

productRouter.post('/add', async (req, res) => {
    console.log(Date.now());
    console.log(req.body);
    const resultAdd = await axios({
        method: 'post',
        url: 'https://exciting-efficient-roquefort.glitch.me/api/productos',
        headers: {
            'auth-token': '123456',
            'Content-Type': 'application/json'
        },
        data: req.body
    });
    console.log(resultAdd);
    res.status(200).json({});
})

productRouter.delete('/remove/:idProduct', async (req, res) => {
    try {
        const cart = await axios({
            method: 'delete',
            url: `https://exciting-efficient-roquefort.glitch.me/api/productos/${req.params.idProduct}`,
            headers: {
                'auth-token': '123456',
                'Content-Type': 'application/json'
            }
        })
    } catch (e) {
        console.log(e.message);
    }
    res.status(200).json({ status: "ok" });
});

productRouter.get('/show/:idProduct', async (req, res) => {
    const products: any = await obtainProductById(parseInt(req.params.idProduct));
    res.status(200).json(products.data);
});