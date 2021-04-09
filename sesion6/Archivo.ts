import { Chance } from "chance";
import fs from "fs";

export class Archivo {

    private filename: string;
    private _jsonObject: any = [];

    /**
     * getter jsonObject
     */
    get jsonObject(): [] {
        return this._jsonObject;
    }

    /**
     * setter jsonObject
     */
    set jsonObject(value: []) {
        this._jsonObject = value;
    }

    /**
     * 
     * @param filename 
     */
    constructor(filename: string) {
        this.filename = filename;
    }

    /**
     * leer
     */
    public async leer() {
        let isExist = false;

        try {
            isExist = await this.checkIfExist(this.filename);
            if (isExist) {
                const contenido = await fs.promises.readFile(this.filename, 'utf-8');
                this._jsonObject = JSON.parse(contenido);
                console.log(this._jsonObject);
            } else {
                console.log('Archivo Vacio');
            }

        } catch (error) {
            console.error(error);
        }
    }

    /**
     * guardar un nuevo objeto usando la libreria chance que retorna elementos random
     */
    public async guardar() {
        const chance = new Chance();
        const newElement = {
            title: chance.animal(),
            price: Math.ceil(Math.random() * 1000),
            thumbmail: chance.avatar(),
            id: this._jsonObject.length + 1
        }
        this._jsonObject.push(newElement);

        try {
            await fs.promises.writeFile(this.filename,
                JSON.stringify(this._jsonObject, null, '\t'), 'utf-8');

        } catch (error) {
            console.error(error);
        }

    }

    /**
     * 
     * @param filename 
     * @returns true si existe el archivo
     */
    private async checkIfExist(filename: string) {
        try {
            await fs.promises.access(this.filename);
        } catch (error) {
            return false;
        }
        return true;
    }

    /**
     * borrar
     */
    public async borrar() {
        try {
            await fs.promises.unlink(this.filename);
        } catch (error) {
            console.error(error);
        }
    }

}
