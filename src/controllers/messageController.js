import MessageDaoMongo from '../dao/messageDao.mongo.js';
export class MessageController {

    constructor(config) {
        if (!MessageController._instance) {
            if (config == "Mongo") {
                this.messageDao = new MessageDaoMongo();
            }
            MessageController._instance = this;
        } else {
            return MessageController._instance;
        }
    }

    async createMessage(data) {
        try {
            const messageList = await this.messageDao.insertChat(data);
            return messageList;
        } catch (error) {
            throw new Error(error);
        }
    };

    async getAllChats(req, res, next) {
        try {
            const messageList = await this.messageDao.getAllChats();
            return messageList;
        } catch (error) {
            throw new Error(error);
        }
    };

    async getChatsByUser(email) {
        try {
            const messageList = await this.messageDao.getChatsByUser(email);
            return messageList;
        } catch (error) {
            throw new Error(error);
        }
    }
}