import { MessageService } from '../services/messageService.js';
import {normalize, schema} from 'normalizr';

export class MessageController {

    static async createMessage(data) {
        try {
            const messageList = await MessageService.insertChat(data);
            return messageList;
        } catch (error) {
            throw new Error(error);
        }
    };

    static async getAllChats(req, res, next) {
        try {
            const messageList = await MessageService.getAllChats();
            return messageList;
        } catch (error) {
            throw new Error(error);
        }
    };
}