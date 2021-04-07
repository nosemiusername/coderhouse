import { createServer } from 'http';

let server = createServer( (request, response) => {
    let randomNumber = Math.ceil(Math.random()*10);
    const responseObject = {
        id: randomNumber,
        title: `Producto ${randomNumber}`,
        price: randomNumber,
        thumbmail: `Foto ${randomNumber}` 
    }
    response.end(JSON.stringify(responseObject));
}).listen(3000);
