import fs from 'fs';

export const isAdmin = (req: any) => {
    if (req["auth-token"]) {
        return 1;
    } else {
        return 0;
    }
};

export const save = (jsonData: object, objectType:string="productList") => {
    fs.writeFile(`./fs/_${objectType}.json`, JSON.stringify(jsonData, null, '\t'), function (err) {
        if (err) {
            console.log(err);
        }
    })
};