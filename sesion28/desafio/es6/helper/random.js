const numbers = []

process.on('message', cant => {
    console.log('Executing .js')
    Array.from(new Array(cant), (v, k) => {
        const randomNumber = Math.floor(Math.random() * 255)
        console.log(randomNumber)
        numbers[randomNumber] = (numbers[randomNumber] || 0) + 1
    })
    process.send(numbers)
})
