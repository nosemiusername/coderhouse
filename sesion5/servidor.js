const http = require("http");

let server = http.createServer( (request, response) => {
    const hour = new Date ;
    const currentdate = hour.getHours();
    if (currentdate > 6 && currentdate < 12  )
        console.log('Buendia')
    else if (currentdate > 6 && currentdate < 12  )
        console.log('Buenas tardes');
    else if (currentdate > 13 && currentdate < 24  )
        console.log('Buenas noches');
    response.end(JSON.stringify(currentdate));
}).listen(3000);
z