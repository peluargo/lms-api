// database/migrations/1700000000004_create_guardians_table.ts
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'guardians'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      // O responsável
      table
        .integer('guardian_id')
        .unsigned()
        .references('id')
        .inTable('accounts')
        .onDelete('CASCADE')

      // O dependente
      table
        .integer('student_id')
        .unsigned()
        .references('id')
        .inTable('accounts')
        .onDelete('CASCADE')

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
