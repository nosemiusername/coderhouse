const numbers = [];

process.on('exit', (code) => {
    process.argv.forEach((val) => {
        if (!isNaN(val)) numbers.push(Number(val))
    });

    const resp = {
        numeros: numbers,
        promedio: numbers.reduce((acc, val) => { return acc + val }, 0) / numbers.length,
        min: Math.min.apply(null, numbers),
        max: Math.max.apply(null, numbers),
        ejecutable: process.argv[1],
        pid: process.pid,
    }

    console.log(resp);
    console.log(numbers.reduce((acc, val) => acc + val, 0));
})
