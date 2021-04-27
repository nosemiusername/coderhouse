const socket = io(); // Ya podemos empezar a usar los sockets desde el cliente :)
// Cliente
socket.on('mensajes', data => {
    alert(data);
    socket.emit('mensajes', 'Mensaje recibido exitosamente');
})

