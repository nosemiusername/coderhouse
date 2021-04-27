const socket = io();
socket.on('mensaje', data => {
    const tableContainder = $('#table-products');
    const dataTable = fillTable;
    tableContainder.empty();
    tableContainder.innerHTML = dataTable;
});

document.getElementById("btn-add-product").addEventListener("click", () => {
    const socket = io();
    io.on('mensaje', socket => {
        const myForm = document.getElementById();
        const formData = new FormData(myForm);
        socket.emit('mensaje', formData);
    });

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