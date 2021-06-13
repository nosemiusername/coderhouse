import { Message } from '../models/message.mongo.js';
import { Message as LocalMessage } from '../models/message.local.js';
import { normalize, schema, denormalize } from 'normalizr';
import util from 'util';

export class MessageService {

    static async getAllChats() {
        try {
            const locaMessage = LocalMessage.getInstance();
            const chats = locaMessage.get();
            console.log(chats);
            const autorSchema = new schema.Entity('autor', {}, { idAttribute: 'email' });
            const chatSchema = new schema.Entity('chat', {
                autor: autorSchema,
            }, { idAttribute: 'fecha' });

            const chatsSchema = new schema.Array(chatSchema);
            const normalizedChats = normalize(chats, chatsSchema);

            const denormalizedChats = denormalize(normalizedChats.result, chatsSchema, normalizedChats.entities);
            console.log(denormalizedChats);
            console.log(JSON.stringify(denormalizedChats).length);

            return normalizedChats;
        } catch (error) {
            console.error(error);
        }
    }

    static async insertChat(chat) {
        try {
            const localMessage = LocalMessage.getInstance();
            const text = chat.text;
            delete chat.text;
            const timeElapsed = Date.now();
            const today = new Date(timeElapsed);
            const updatedChat = {
                autor: { ...chat },
                text: text,
                fecha: today.toISOString(),
            };
            await Message.create(updatedChat);
            localMessage.add(updatedChat);
            return await this.getAllChats();
        } catch (error) {
            console.error(error);
        }
    }

}