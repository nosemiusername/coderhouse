import config from '../config/index.js';

constructor(config) {
    this.knex = new knex(config);
    this.createTable();
}

createTable() {
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