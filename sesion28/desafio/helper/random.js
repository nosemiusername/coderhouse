const numbers = []

process.on('message', cant => {
    Array.from(new Array(cant), (v, k) => {
        const randomNumber = Math.floor(Math.random() * 255);
        numbers[randomNumber] = (numbers[randomNumber] || 0) + 1;
    })
    process.send(numbers);
})