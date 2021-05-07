export class Perimetro {
    private radio:number = 0;
    private ancho:number = 0;
    private largo:number = 0;

    public constructor(radio:number, ancho:number, largo:number){
        this.radio = radio;
        this.ancho = ancho;
        this.largo = largo;
    }

    public calcularCuadrado():number{
        return 4*(this.ancho);
    }

    public calcularCirculo():number{
        return 2*Math.PI*this.radio;
    }

    public calcularRectangulo():number{
        return 2*(this.ancho+this.largo);
    }
}