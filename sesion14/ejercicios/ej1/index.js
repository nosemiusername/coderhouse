class ColorGenerator{
    getColor(){
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);

        return ([r,g,b]);
    };

}


const randomColor = new ColorGenerator();
console.log(`hola ${randomColor.getColor()}`);

