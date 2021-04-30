const socket = io.connect(); // Ya podemos empezar a usar los sockets desde el cliente :)
// Cliente
socket.on('messages', data => { render(data); });

const render = data => {
    const html = data.map((elem, index) => {
        return (`<div> 
            <strong>${elem.autor}</strong>
            <em>${elem.text}</em>`)
    }).join(" ");
    document.getElementById('mensagges').innerHTML = html;
}


const addMessage = e => {
    const mensaje = {
        autor: document.getElementById('usrname').value,
        text: document.getElementById('texto').value
    };
    io.sockets.emit('new-menssage', 'mensaje');
    return false;
}