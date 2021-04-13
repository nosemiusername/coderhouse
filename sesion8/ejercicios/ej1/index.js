import express from 'express';

const app = express();
const frase = 'hola mundo como están';
const server = app.listen(8080, 'localhost', () => {
    console.log(`${server.address().port}`)
});

const isNumeric = (value) => {
    return !isNaN(value)
}

app.get('/:num', (req, res) => {
    res.send(req.query);
})

app.get('/frase', () => {
    res.send(frase);
})

app.get('/letras/:id', (req, res) => {
    let letra = '';
    if (isNumeric(req.params.id)) {
        letra = frase[req.params.id - 1];
    } else {
        letra = 'Parametro no es numerico';
    }
    res.json(letra);
})


app.get('/palabra/:id', (req, res) => {
    let palabras = frase.split(' ');
    let palabra = '';
    console.log(isNumeric(req.params.id));
    if (isNumeric(req.params.id)) {
        palabra = palabras[req.params.id - 1];
    }
    res.send(palabra);
    
})