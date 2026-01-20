import { BaseSeeder } from '@adonisjs/lucid/seeders'
import app from '@adonisjs/core/services/app'

export default class IndexSeeder extends BaseSeeder {
  private async runSeeder(Seeder: { default: any }) {
    const targetEnvironments = Seeder.default.environment || []

    /**
     * Verifica se o ambiente atual está na lista permitida do Seeder
     */
    const isAllowed = targetEnvironments.includes(app.nodeEnvironment)

    if (!isAllowed) {
      return
    }

    await new Seeder.default(this.client).run()
  }

  public async run() {
    await this.runSeeder(await import('../contact_type_seeder.js'))
    await this.runSeeder(await import('../role_seeder.js'))
    await this.runSeeder(await import('../account_seeder.js'))
  }
}
