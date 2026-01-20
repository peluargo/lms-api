import { BaseSeeder } from '@adonisjs/lucid/seeders'
import ContactType, { ContactTypes } from '#models/contact_type'

export default class extends BaseSeeder {
  async run() {
    const data = Object.entries(ContactTypes)
      .filter(([key, _]) => Number.isNaN(Number(key)))
      .map(([key, value]) => ({
        id: Number(value),
        name: key,
      }))

    await ContactType.updateOrCreateMany('id', data)
  }
}
