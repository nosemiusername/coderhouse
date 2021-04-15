import express from 'express';
import multer from 'multer';

const app = express();
const PORT = 3000;
const routerPersona = express.Router();
const person = []
app.use(express.json());
/* app.use(express.static('public')); */
routerPersona.get('/person', (req, res) => {
    res.json(person);
});

routerPersona.post('/person', (req, res) => {
    console.log(req.body);
    res.json(person);
});


app.use('/', routerPersona);
app.listen(PORT);
