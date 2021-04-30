const socket = io();
socket.on('message', data => {
    const divTableContainer = document.getElementById('div-table-container');
    if (data.length > 0) {
        divTableContainer.innerHTML = fillTable(data);
    } else {
        divTableContainer.innerHTML = fillNoData();
    }
});

document.getElementById("btn-add-product").addEventListener("click", () => {
    const elements = document.getElementById("form-product").elements;
    const obj = {};

    for (var i = 0; i < elements.length; i++) {
        var item = elements.item(i);
        obj[item.name] = item.value;
    }
    socket.emit('new-message', obj);

})

const fillTable = (data) => {
    dataTable = `
    <table class="table table-hover" id="table-products">
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
                <td><img src=${product.thumbnail} alt=${product.thumbnail} width="24" height="24"</td>
            </tr>
        `
    })
    dataTable += `
        </tbody>
        </table>
        `
        ;
    return dataTable;
}

const fillNoData = () => {

    const noDataElement =
        `<div class="alert alert-warning" role="alert">
        No hay productos
    </div>`

    return noDataElement;
}