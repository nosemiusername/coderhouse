import fs from 'fs';

export const save = (jsonData, filename="db.json") => {
    fs.writeFile(filename, JSON.stringify(jsonData, null, '\t'), function (err) {
        if (err) {
            console.log(err);
        }
    })
};