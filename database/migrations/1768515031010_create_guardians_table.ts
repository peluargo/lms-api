import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'guardians'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      // O responsável
      table
        .integer('guardian_account_id')
        .unsigned()
        .references('id')
        .inTable('accounts')
        .onDelete('CASCADE')

      // O dependente
      table
        .integer('account_id')
        .unsigned()
        .references('id')
        .inTable('accounts')
        .onDelete('CASCADE')

      table.unique(['guardian_account_id', 'account_id'])

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
