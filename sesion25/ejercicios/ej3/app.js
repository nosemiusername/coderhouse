import express from 'express';
import session  from 'express-session';
import cookieParser  from 'cookie-parser';

import FileStore from 'session-file-store';

const fileStore = FileStore(session);

const PORT = 3000;
const app = express();
app.use(express.json());
app.use(cookieParser);
app.use(session({
    store: new FileStore({path: '../sesiones', ttl:300, retries:0}),
    secret:'secreto',
    resave:true,
    saveUninitialized: false

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

app.listen(PORT);