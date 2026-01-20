import { BaseSchema } from '@adonisjs/lucid/schema'
import { ContactTypes } from '#models/contact_type'

export default class extends BaseSchema {
  protected tableName = 'contacts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table
        .integer('contact_type_id')
        .unsigned()
        .references('id')
        .inTable('contact_types')
        .onDelete('RESTRICT')
        .notNullable()

      table
        .integer('account_id')
        .unsigned()
        .references('id')
        .inTable('accounts')
        .onDelete('CASCADE')
        .notNullable()

      table.string('value').notNullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })

    // Garante que para cada account_id, só exista UM contato do tipo EMAIL
    this.schema.raw(`
      CREATE UNIQUE INDEX "unique_primary_email"
      ON "${this.tableName}" ("account_id", "contact_type_id")
      WHERE "contact_type_id" = ${ContactTypes.EMAIL}
    `)
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
