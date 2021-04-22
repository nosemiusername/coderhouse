import express from 'express';
const app = express();
const PORT = 3000;
app.use(express.json());
app.set('views', './views');
app.set('view engine', 'ejs');


app.get('/datos', (req, res) => {
    const datos = req.query;
    console.log(datos)
    res.render('hello.ejs', {mensaje:'Usando pug', datos:datos})
})

app.listen(PORT);
