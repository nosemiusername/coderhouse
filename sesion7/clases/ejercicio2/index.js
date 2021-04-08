import express, { json } from 'express';
import moment from 'moment';
const app = express();
const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Sample Site</title>

    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css">
    <style>
        body { padding-top:50px; }
    </style>
</head>
<body>

    <div class="container">
        <div class="jumbotron">
            <h1>res.sendFile() Works!</h1>
        </div>
    </div>

</body>
</html>`
let visitas = 0;
const server = app.listen(8080, () => {
    console.log(`${server.address().port}`);
});
app.get('/', (req, res) => { res.send(html)})
app.get('/fyh', (req, res) => { 
    const today = moment().format('DD/MM/YYYY HH:MM:SS');
    res.json(today)})
app.get('/visitas', (req, res) => { 
    res.json(++visitas)})
server.on("error", error => { console.error(error)})

