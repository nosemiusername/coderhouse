import mongoose from 'mongoose';
import { Server as ioServer } from 'socket.io';
import config from '../config/index.js';
import { MessageController } from '../controllers/message.controller.js';
import { sendSMS } from '../helper/index.js';
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
                if (data == config.SMS_TEXT_NOTIFICATION) sendSMS(chat);
            });
        });
    }
}

class MongoDBaaS {
    static async connect() {
        try {
            const res = await mongoose.connect(config.mongoURI, {
                useNewUrlParser: true,
                useCreateIndex: true, useUnifiedTopology: true
            });
            console.log(`MongoDBaaS: Connection ${mongoose.STATES[res.connection.readyState]}`);
        } catch (error) {
            console.log(`Error in DB connection ${err}`);
        }
    }
}

export const load = async (http) => {
    await MongoDBaaS.connect();
    WebSoccket.connect(http);
}
