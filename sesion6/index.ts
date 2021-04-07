const loadFile = async () => {
    const module = await import('./Archivo');
    const archivo = new module.Archivo('productos.txt')
    try {
        await archivo.leer();
        await archivo.guardar();
        setTimeout(() => {
            console.log("Borrando archivo...")
            archivo.borrar();
        }, 5000)
    } catch(error){
        console.error(error);
    }

}

loadFile();