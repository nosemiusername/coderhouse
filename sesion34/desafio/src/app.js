import express from 'express';
import { config } from './config/index.js'
import AWS from 'aws-sdk';

const PORT = config.port;
const __dirname = process.cwd();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

AWS.config.region = process.env.REGION

const sns = new AWS.SNS();
const ddb = new AWS.DynamoDB();

const ddbTable = process.env.STARTUP_SIGNUP_TABLE;
const snsTopic = process.env.NEW_SIGNUP_TOPIC;

app.get('/', (req, res, next) => {
    console.log();
    res.sendFile(`${__dirname}/src/public/index.html`);
});

app.get('/main.css', function (req, res) {
    res.sendFile(`${__dirname}/src/public/main.css`);
});

app.post('/save', (req, res, next) => {
    const { name, url, cant } = req.body;

    ddb.putItem({
        'TableName': ddbTable,
        'Item': name,
        'Expected': { url: { Exists: false } }
    }, function (err, data) {
        if (err) {
            var returnStatus = 500;

            if (err.code === 'ConditionalCheckFailedException') {
                returnStatus = 409;
            }

            res.status(returnStatus).end();
            console.log('DDB Error: ' + err);
        } else {
            sns.publish({
                'Message': 'Name: ' + name + "\r\nEmail: " + email
                    + "\r\nPreviewAccess: " + req.body.previewAccess
                    + "\r\nTheme: " + req.body.theme,
                'Subject': 'New user sign up!!!',
                'TopicArn': snsTopic
            }, function (err, data) {
                if (err) {
                    res.status(500).end();
                    console.log('SNS Error: ' + err);
                } else {
                    res.status(201).end();
                }
            });
        }
    });


    res.status(200).json("Agregado");
})

app.listen(PORT, () => {
    console.log(`Application is listening at port ${PORT}`)
})