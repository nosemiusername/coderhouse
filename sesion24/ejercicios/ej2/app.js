import express from 'express';
import session  from 'express-session';

const PORT = 3000;
const app = express();
app.use(express.json());
// app.use(express.urlencoded);
app.use(session({
    secret:'secreto',
    resave:true,
    saveUninitialized: true
}));

app.get('/root', (req, res, next) => {
    if (!req.session){
        req.session.count = 1;
        res.send('Te damos la bienvenida');
    }else{
        console.log(req.session);
        req.session.name = req.query.name;
        req.session.count ++;
        res.send(`Hola ${req.session.name}: ${req.session.count}`);

    }
})

app.get('/olvidar', (req, res, next) => {
    req.session.destroy();
    res.send('Chao');
})

app.get
app.listen(PORT);