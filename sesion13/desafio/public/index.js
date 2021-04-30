const socket = io();
socket.on('products', data => {
    const divTableContainer = document.getElementById('div-table-container');
    if (data.length > 0) {
        divTableContainer.innerHTML = fillTable(data);
    } else {
        divTableContainer.innerHTML = fillNoData();
    }
});

socket.on('chats', data => {
    const divChatContainer = document.getElementById('div-chat-list');
    if (data.length > 0) {
        divChatContainer.innerHTML = fillChatList(data);
    }
})

document.getElementById('btn-add-chat').addEventListener("click", () => {
    socket.emit('new-chat', obtainElementsByForm('form-chat'));
})

document.getElementById("btn-add-product").addEventListener("click", () => {
    const obj = obtainElementsByForm('form-product');
    socket.emit('new-product', obtainElementsByForm('form-product'));
})

const fillTable = (data) => {
    let dataTable = `
    <h2>Lista de Productos</>
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
                <td>${product.price}</td>
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

const fillChatList = (data) => {

    let chatList = ``;

    data.forEach(element => {
        chatList += 
            `<span style='color:blue'>${element.email}</span> 
            <span style='color:red'>[${element.time}]:</span>
            <span style='color:green'>${element.message}</span>  
            <br>`
    })

    return chatList;
}

const obtainElementsByForm = formName => {
    const elements = document.getElementById(formName).elements;
    const obj = {};

    for (let i = 0; i < elements.length; i++) {
        let item = elements.item(i);
        obj[item.name] = item.value;
    }

    return obj;
}