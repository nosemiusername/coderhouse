import twilio from 'twilio';
import express from 'express';

const app = express();
const PORT = 3000;
const __dirname = process.cwd();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sid = 'AC1ea5ddc4d9d01efd5a0b70689e862a68';
const auth = '297eb81321be0cb4031e54eb9f34ffa6';

const client = twilio(sid, auth);

app.get('/', function (req, res) {
    res.sendFile(`${__dirname}/public/index.html`);
});

app.get('/main.css', function (req, res) {
    res.sendFile(`${__dirname}/public/main.css`);
});

app.post('/send', function (req, res) {
    const { to, msg, url } = req.body;


    const client = twilio(sid, auth);

    client.messages.create({
        body: msg,
        from: 'whatsapp:+14155238886',
        mediaUrl: [url],
        to: `whatsapp:+569${to}`,
    })
        .then(message => console.log(message))
        .catch(console.log);

    res.sendFile(`${__dirname}/public/index.html`);
});

app.listen(PORT, () => {
    console.log(`Application is listening at port ${PORT}`);
});