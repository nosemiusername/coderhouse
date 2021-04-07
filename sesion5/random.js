
const objectValues = {};
console.log('ds')

for ( let i = 0 ; i < 10 ; i++){
    let random = Math.ceil(Math.random() * 20 + 1);
    console.log(random);
    if (random in objectValues) {
        objectValues[random] ++;
    } else
        objectValues[random] = 1
}

console.log(objectValues);