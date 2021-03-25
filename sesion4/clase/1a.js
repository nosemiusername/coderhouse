function* randomNumbers(min, max){
    let counter = 0;
    while (true){
        objectRandom = {
            orden: counter++,
            numero: Math.floor(Math.random() * (max - min)) + min,
            fyh: Date.now()
        }
        yield objectRandom;
    }
}

let gen = randomNumbers(5, 10);
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);