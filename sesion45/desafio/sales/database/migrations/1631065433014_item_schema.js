'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ItemSchema extends Schema {
  up() {
    this.create('items', (table) => {
      table.increments()
      table.string('productName', 255).notNullable(),
        table.string('department', 255).notNullable(),
        table.integer('price'),
        table.integer('stock'),
        table.string('productDescription', 255).notNullable(),
        table.string('image', 255).notNullable(),
        table.timestamps()
    })
  }

  down() {
    this.drop('items')
  }
}

module.exports = ItemSchema
