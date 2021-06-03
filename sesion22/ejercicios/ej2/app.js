import express from 'express'

const app = express();
app.use(express.json());
app.use(express.urlencoded);

app.get('/test', (req, res) => {
    
    console.log(arrayComb);
    res.json()
})

app.listen(3000);