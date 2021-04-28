const socket = io();

document.getElementById("btn-add-product").addEventListener("click", () => {
    const elements = document.getElementById("form-product").elements;
    const obj ={};
    
    for(var i = 0 ; i < elements.length ; i++){
        var item = elements.item(i);
        obj[item.name] = item.value;
    }
    socket.emit('mensaje', obj);

})

const fillTable = (data) => {
    dataTable = `
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>foto</th>
            </tr>
        </thead>
        <tbody>`;
    data.forEach(product => {
        dataTable += `
            <tr>
                <td>${product.title}</td>
                <td>${product.prize}</td>
                <td>${product.thumbnail}</td>
            </tr>
        `
    })
    dataTable += `
        </tbody>
        `
        ;
    return dataTable;
}