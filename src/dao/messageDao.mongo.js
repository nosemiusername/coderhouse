import { Message } from '../models/message.mongo.js';
import { mongoToObject } from '../utils/index.js';
import { error } from '../config/logger.js';
import MessageDao from '../dao/messageDao.js';
import config from '../config/index.js'
export default class MessageDaoMongo extends MessageDao {

    constructor() {
        super();
    }

    /**
     * Return all messages
     * @returns Array(Message)
     */
    async getAllChats() {
        try {
            const res = await Message.find();
            const chats = mongoToObject(res);
            return chats;
        } catch (err) {
            error(err);
        }
    }

    /**
     * Find chats by user
     * @param {string} email 
     * @returns Message
     */
    async getChatsByUser(email) {
        try {
            const res = await Message.find({ 'autor.email': email });
            const chats = mongoToObject(res);
            return chats;
        } catch (err) {
            error(err);
        }

    }

    /**
     * Save chat
     * @param {string} chat 
     * @returns Array(Message)
     */
    async insertChat(chat) {
        try {
            const text = chat.text;
            delete chat.text;
            const timeElapsed = Date.now();
            const today = new Date(timeElapsed);
            const type = chat.email === config.admin_email ? "sistema" : "usuario";
            const updatedChat = {
                autor: { ...chat, type: type },
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