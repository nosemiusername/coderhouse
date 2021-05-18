import axios from 'axios';
import express, {Router} from 'express';

export const cartRouter = Router();
cartRouter.use(express.json());
cartRouter.use(express.static('public'));

cartRouter.get('/:idCart/show', async (req, res) => {

    try {
        const cart = await axios({
            method: 'get',
            url: `https://exciting-efficient-roquefort.glitch.me/api/carrito/${req.params.idCart}/show`,
        });

        if (cart.data._productList.length > 0) {
            const sum = cart.data._productList.map((element: any) => element._price)
                .reduce((accum: number, actual: number) => accum + actual, 0);

            const response = {
                sum: sum,
                length: cart.data._productList.length,
                ...
                cart.data
            }
            res.json(response);
        } 

    } catch (e) {
        res.json({});
    }

});

cartRouter.post('/:idCart/add', async (req, res) => {

    const addResult = await axios({
        method: 'post',
        url: `https://exciting-efficient-roquefort.glitch.me/api/carrito/${req.params.idCart}`,
        data: req.body
    });

    res.status(200).json({ status: "ok" });

});

cartRouter.delete('/:idCart/remove/:idProduct', async (req, res) => {
    try{
    const cart = await axios({
        method: 'delete',
        url: `https://exciting-efficient-roquefort.glitch.me/api/carrito/${req.params.idCart}/delete/${req.params.idProduct}`,
    });
    } catch (e) {
        console.log(e.message);
    }
    res.status(200).json({ status: "ok" });
});
