import { Chance } from "chance";
import fs from "fs";

export class Archivo {

    private filename:string;
    private jsonObject: any = {};

    constructor(filename:string){
        this.filename = filename;
    }

    /**
     * leer
     */
     public async leer() {
        try {
            const contenido = await fs.promises.readFile(this.filename, 'utf-8');
            this.jsonObject = JSON.parse(contenido);
            console.log(this.jsonObject);
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * guardar
     */
    public async guardar() {
        const chance = new Chance();
        const newElement = {
            title: chance.animal(),
            price: Math.ceil(Math.random()*1000),
            thimbmail: chance.avatar(),
            id: this.jsonObject.length + 1
        }
        this.jsonObject.push(newElement);

        try {
            await fs.promises.writeFile(this.filename, 
                JSON.stringify(this.jsonObject, null, '/t'), 'utf-8');
        } catch (error) {
            console.error(error);
        }
        
    }

    
    /**
     * borrar
     */
    public async borrar() {
        try{
            await fs.promises.unlink(this.filename);
        }catch (error)
        {
            console.error(error);
        }
    }

}
