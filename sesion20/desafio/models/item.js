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

    updateTable(id,newItem){
        return this.knex('items').where({id:id}).update(newItem);
    }


    selectTable(){
        return this.knex('items').select();
    }

    selectTableByID(id){
        return this.knex('items').where({id:id}).select();
    }

    insertTable(items){
        return this.knex('items').insert(items);
    } 

    async deleteTable(id){
        const item = await this.selectTableByID(id);
        if (item.length) {
            return this.knex('items').where({id:id}).delete();
        } else {
            throw Error('No data found');
        } 
    }

    close (){
        return this.knex.destroy();
    }


}