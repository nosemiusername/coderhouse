import express from 'express';
import fs from 'fs';

const app = express();
const visitas = {
    visitas: {
        ruta1: 0,
        ruta2: 0
    }
};

const server = app.listen(8080, () => {
    console.log(`${server.address().port}`);
});

app.get('/', (req, res) => {
    res.json(0);
});

app.get('/items', async (req, res) => {
    try {
        const items = await fs.promises.readFile('productos.txt', 'utf-8');
        const countElements = {};
        JSON.parse(items).map(element => element.title).
            forEach(value => countElements[value] = (countElements[value] || 0) + 1);
        res.json(countElements)
    } catch (error) {
        console.error(error);
        res.json(error);
    }
    ++visitas.visitas.ruta1;
})
app.get('/item-random', async (req, res) => {
    try {
        const items = await fs.promises.readFile('productos.txt', 'utf-8');
        const jsonItems = JSON.parse(items);
        const randomNumber = Math.floor(Math.random()*jsonItems.length)
        const itemsWithTitle = jsonItems.map(element => element.title);
        const returnedObject = { item: itemsWithTitle[randomNumber]}
        res.json(returnedObject);
    } catch (error) {
        console.error(error);
        res.json(error);
    }
    ++visitas.visitas.ruta2;
})
app.get('/visitas', (req, res) => {
    res.json(visitas)
})
server.on("error", error => { console.error(error) })

