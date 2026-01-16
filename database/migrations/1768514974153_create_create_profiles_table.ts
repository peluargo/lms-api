import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'profiles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table
        .integer('account_id')
        .unsigned()
        .references('id')
        .inTable('accounts')
        .onDelete('CASCADE')
        .notNullable()
      table.string('first_name').notNullable()
      table.string('last_name').notNullable()
      table.date('birth_date')

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
