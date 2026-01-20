import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'contact_types'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('id').primary().unsigned()

      table.string('name').notNullable().unique()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
