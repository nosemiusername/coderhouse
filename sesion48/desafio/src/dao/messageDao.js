import { Message } from '../models/message.mongo.js';
import { mongoToObject } from '../utils/index.js';
import { error } from '../config/logger.js';

export class MessageDao {

    static async getAllChats() {
        try {
            const res = await Message.find();
            const chats = mongoToObject(res);
            return chats;
        } catch (err) {
            error(err);
        }
    }

    static async getChatsByUser(email) {
        try {
            const res = await Message.find({ 'autor.email': email });
            const chats = mongoToObject(res);
            return chats;
        } catch (err) {
            error(err);
        }

    }

    static async insertChat(chat) {
        try {
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
            return await this.getAllChats();
        } catch (err) {
            error(err);
        }
    }

}