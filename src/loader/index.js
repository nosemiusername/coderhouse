import Mongo from '../db/dbMongo.js';
import { Server as ioServer } from 'socket.io';
import config from '../config/index.js';
import { MessageController } from '../controllers/messageController.js'

class WebSoccket {
    static connect(http) {
        const io = new ioServer(http);
        console.log(`Websocket: Connection Succesful`)
        io.on('connection', (socket) => {
            console.log("New Connection");

            MessageController.getAllChats()
                .then(chats => {
                    socket.emit('chats', chats);
                });

            socket.on('new-chat', data => {
                const chat = MessageController.createMessage(data);
                io.sockets.emit('chats', chat);
            });
        });
    }
}

export const load = async (http) => {
    try {
        const db = await eval(`${config.flagDB}.getInstance()`);
        await db.connect();
        WebSoccket.connect(http);
    } catch (error) {
        throw new Error(error);
    }
};
