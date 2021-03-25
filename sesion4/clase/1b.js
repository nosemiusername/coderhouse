function* randomNumbers(min, max){
    let counter = 0;
    return{
        next: function(){ 
            return {value:
                {
                    orden: counter++,
                    numero: Math.floor(Math.random() * (max - min)) + min,
                    fyh: Date.now()
                }
            }
        }
     
    }
}

let gen = randomNumbers(5, 10);
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);