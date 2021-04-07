import fs from "fs";


fs.promises.readFile('./package.2json', 'utf-8').then( data => 
    console.log(JSON.parse(data)))
    .catch( err => {
        console.log(err);
    });
