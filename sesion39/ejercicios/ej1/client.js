
const axios = require('axios');

//create a server object:
axios('http://localhost:8080/').then(response =>
    console.log(response.data));


// axios('http://localhost:8080/')
//     .then(function (response) {
//         console.log(JSON.stringify(response.data));
//     })

console.log("holas");