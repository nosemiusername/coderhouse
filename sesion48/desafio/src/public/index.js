let validForm = true;
const socket = io();

socket.on('chats', data => {
    const divChatContainer = document.getElementById('div-chat-list');
    if (data.length > 0) {
        divChatContainer.innerHTML = fillChatList(data);
    }
})

const addChat = () => {
    socket.emit('new-chat', obtainElementsByForm('form-chat'));
    document.getElementById('message').value = "";
    return false;
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

