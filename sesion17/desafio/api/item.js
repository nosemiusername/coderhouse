"use strict";

import knex from 'knex';

export default class Item{

    constructor(config){
        this.knex = new knex(config);
    }

    createTable(){
        return this.knex.schema.dropTableIfExists('items')
        .then(() => {
            return this.knex.schema.createTable('items', table => {
                table.increments('id').primary();
                table.string('nombre', 30).notNullable();
                table.string('categoria', 30).notNullable();
                table.integer('stock', 30);
            })
        })
    }

    updateTable(){

    }


    selectTable(){

    }

    insertTable(items){
        return this.knex.schema.insertTable('items', items);
    }   


}