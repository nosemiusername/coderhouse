let selling = [{id:1, nombre:"reloj", precio:1.5} , {id:1, nombre:"celular", precio:5}, {id:1, nombre:"sed", precio:6}]

const a  = () => {
    const mapSelling = selling.map( val => val.precio).reduce( (val1,val2) => val1 + val2);

    console.log(mapSelling);
    
}

const b  = () => {
    const mapSelling = selling.map( val => val.precio).reduce( (val1,val2) => val1 + val2);
    console.log(mapSelling/selling.length);
    
}

const c  = () => {
    const max = selling.map( val => val.precio).reduce( (val1,val2) => Math.max(val1,val2));
    const value = selling.filter( val => val.precio == max).map(val => val.nombre);
    console.log(value);
}



a();
b();
c();
c();
