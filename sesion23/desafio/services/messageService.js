import { Message } from '../models/message.js';
import { normalize, schema } from 'normalizr';
import util from 'util';

export class MessageService {

    static async getAllChats() {
        try {
            const chats = await Message.find({}, '-_id autor.email autor.alias autor.avatar');
            const autorSchema = new schema.Entity('autor','autor', {idAttribute:'email'});
            const chatsSchema = { autores: new schema.Array(autorSchema)};
            const normalizedChats = normalize(chats, chatsSchema);
            console.log(util.inspect(chats, false, 12, true));
            console.log(util.inspect(normalizedChats, false, 12, true));
            return normalizedChats;
        } catch (error) {
            console.error(error);
        }
    }

    static async insertChat(chat) {
        try {
            const text = chat.text;
            delete chat.text;
            await Message.create({
                autor: { ...chat },
                text: text,
                fecha: new Date(),
            });
            return await this.getAllChats();
        } catch (error) {
            console.error(error);
        }
    }

}