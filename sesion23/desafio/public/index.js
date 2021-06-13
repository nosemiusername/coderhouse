let validForm = true;
const socket = io();

socket.on('chats', data => {
    const divChatContainer = document.getElementById('div-chat-list');
    const chats = denormalizer(data);
    if (data.length > 0) {
        divChatContainer.innerHTML = fillChatList(data);
    }
})

const addChat = () => {
    socket.emit('new-chat', obtainElementsByForm('form-chat'));
    document.getElementById('message').value = "";
    return false;
}

const addProduct = () => {
    socket.emit('new-product', obtainElementsByForm('form-product'));
    document.getElementById('title').value = "";
    document.getElementById('price').value = "";
    document.getElementById('thumbnail').value = "";
    return false;
}

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
            `<span style='color:blue'>${element.autor.email}</span> 
            <span style='color:red'>[${element.fecha}]:</span>
            <span style='color:green'>${element.text}</span>  
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

const denormalizer = (normalizedChats) => {
    const autorSchema = new schema.Entity('autor', {}, { idAttribute: 'email' });
    const chatSchema = new schema.Entity('chat', {
        autor: autorSchema,
    }, { idAttribute: 'fecha' });

    const chatsSchema = new schema.Array(chatSchema);
    const denormalizedChats = denormalize(normalizedChats.result, chatsSchema, normalizedChats.entities);
    console.log(denormalizedChats);
    console.log(JSON.stringify(denormalizedChats).length);
    return denormalizedChats;
}