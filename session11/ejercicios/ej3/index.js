import express from 'express';
const app = express();
const PORT = 3000;
const persona = [];
app.use(express.json());
app.set('views', './views');
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('personas.ejs')
})

app.post('/personas', (req, res) => {
    const datos = req.body;
    persona.push(datos);
    hasElements = persona.length > 0 ? true:false;
    console.log(datos)

    res.render('personas.ejs', {hasElements:hasElements, datos:datos})
})


app.listen(PORT);
