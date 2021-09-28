import { MessageDao } from '../dao/messageDao.js';
import { normalize, schema } from 'normalizr';

export class MessageController {

    static async createMessage(data) {
        try {
            const messageList = await MessageDao.insertChat(data);
            return messageList;
        } catch (error) {
            throw new Error(error);
        }
    };

    static async getAllChats(req, res, next) {
        try {
            const messageList = await MessageDao.getAllChats();
            return messageList;
        } catch (error) {
            throw new Error(error);
        }
    };
}