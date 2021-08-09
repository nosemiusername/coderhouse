const https = require('https');

const options = {
    hostname: 'jsonplaceholder.typicode.com',
    port: 443,
    path: '/posts',
    method: 'GET',
};

const req = https.request(options, res => {
    console.log(res.statusCode);

    res.on('data', d => {
        console.log(d);
    });
});

req.on('error', errors => {
    console.error(error)
});

req.end(

);