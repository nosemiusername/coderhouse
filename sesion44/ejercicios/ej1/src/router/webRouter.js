import { Router } from 'express';
import WebController from '../controllers/web.controller.js'
import { buildSchema } from 'graphql';

export default class WebRouter {

    constructor() {
        this.webController = new WebController();
        this.router = Router();
    }

    start() {
        this.router.post('/', this.webController.save);
        return this.router;

        const schema = buildSchema(`
            type Query{
                words():[Word],
            }

            type Mutation {
                saveWord(
                    text: String!,
                )
            }: Word,
            type Word {
                text: String!
                update_at: String!
            }
            `

        );

        const root = {
            words: () => this.webController.getWords();
        }
    }
}
