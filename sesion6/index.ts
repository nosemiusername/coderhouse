const loadFile = () => {
    import('./Archivo')
        .then(module => {
            const archivo = new module.Archivo('productos.txt')
            archivo.leer();
            archivo.guardar();
            setTimeout(() => {
                console.log("Borrando archivo...")
                archivo.borrar();
            }, 5000)
        })
        .catch(error => console.log(error))
}

loadFile();