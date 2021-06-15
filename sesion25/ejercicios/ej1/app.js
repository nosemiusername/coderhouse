import express from 'express';
import cookieParser  from 'cookie-parser';

const PORT = 3000;
const app = express();
app.use(express.json());
// app.use(express.urlencoded);
app.use(cookieParser());


app.post('/cookies', (req, res, next) => {
    //nombre, valor, tiempo
    console.log(req.body);
    const { name, value, time } = req.body;

    res.cookie(name, value, {maxAge:time ? time : 3000}).send('coockie set');

});

app.get('/cookies', (req, res, next) => {
    res.json(req.cookies);
}
)



app.listen(PORT);