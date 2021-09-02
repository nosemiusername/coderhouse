import { ItemController } from '../controllers/itemController.js';
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'
import config from '../config/index.js';

export class ApiRouter {
    constructor() {
        this.itemController = new ItemController(config.flagDB);
    }

    start() {
        const schema = buildSchema(`
    type Query{
        find(id: ID!): Item,
        findAll: [Item],
    }
    
    type Mutation {
        save(item:ItemInput!):Item,
        update(id: ID!, item:ItemInput!):Item
    }

    input ItemInput {
        id: ID
        productName: String
        department: String
        price: Int
        stock: Int
        productDescription: String
        image: String
    }

    type Item {
        id: ID!
        productName: String!
        department: String!
        price: Int!
        stock: Int!
        productDescription: String!
        image: String!
    }
    
    `
        );

        const root = {
            save: item => this.itemController.create(item),
            find: id => this.itemController.getItem(id),
            findAll: this.itemController.getAllItems,
            update: (id, item) => this.itemController.updateItem(id, item),
        }

        return graphqlHTTP({
            schema: schema,
            rootValue: root,
            graphiql: config.GRAPHIQL == 'true'
        });

    }
}