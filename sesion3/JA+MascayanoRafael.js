/**
 * 
 * @param {texto a analizar} text 
 * @param {funcin a ejecutar una vez se revisa el documento} callback 
 * @param {tiempo cada cuato se escribe por consola la palabra del texto} ms 
 */
const aWordEachTime = (text, callback, ms) => {
    let i = 0;
    splitedWords = text.split(' ');
    const idSetInterval = setInterval( () => {
        if (i < splitedWords.length) {
            console.log(splitedWords[i]);
            i++;
        } else{
            console.log(`proceso completo. Cantidad de palabras totales ${splitedWords.length}`);
            clearInterval(idSetInterval);
            setTimeout(callback,0);
        }
        
    }, ms)
}

/**
 * 
 * @param {texto a analizar} text 
 * @param {tiempo cada cuato se escribe por consola la palabra del texto} ms 
 */
const readText = (text, ms=1000) => {

    aWordEachTime(text, () => {
        aWordEachTime(text, () => {
            aWordEachTime(text, () => {}, ms);
        }, ms);
    }, ms);
};

readText('Lorem ipsum dolor sit amet',1000)

