class Color{
    public getColor():number[]{
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);

        return [r,g,b];
    };

}

const color:Color = new Color();
console.log(`${color.getColor()}`);

