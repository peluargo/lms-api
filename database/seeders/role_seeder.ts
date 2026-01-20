import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Role, { Roles } from '#models/role'

export default class extends BaseSeeder {
  static environment = ['development', 'test']

  async run() {
    const data = Object.entries(Roles)
      .filter(([key, _]) => Number.isNaN(Number(key)))
      .map(([key, value]) => ({
        id: Number(value),
        name: key,
      }))

    await Role.updateOrCreateMany('id', data)
  }
}
