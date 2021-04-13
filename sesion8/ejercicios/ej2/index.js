import express from 'express';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
const USER_DB = [];

app.listen(8080);
app.post('/api/usuarios', (req, res) => {
    const data = req.body;
    data.id = USER_DB.length + 1;
    USER_DB.push(data);
    res.status(200).json(USER_DB);

})


app.get('/api/usuarios/:id', (req, res) => {

    const user = USER_DB.filter( value => value.id == req.params.id)[0];
    res.status(200).json(USER_DB)
})


app.delete('/api/usuarios/:id', (req, res) => {

    USER_DB.pop(parseInt(req.params.id));
    res.status(200).json(USER_DB)
})