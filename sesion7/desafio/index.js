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


app.get('/items', (req, res) => {
    try{
      const items = await fs.promises.readFile('productos.txt','utf-8');  
    } catch(error){
        console.error(error);
    }
    ++visitas.visitas.ruta1;
    res.json(0)})
app.get('/item-random', (req, res) => { 
    ++visitas.visitas.ruta2;
    res.json(0)})
app.get('/visitas', (req, res) => { 
    res.json(visitas)})
server.on("error", error => { console.error(error)})

