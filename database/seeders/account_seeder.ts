import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Account from '#models/account'
import { ACCOUNTS } from '#constants/accounts'

export default class extends BaseSeeder {
  static environment = ['development']

  async run() {
    for (const data of Object.values(ACCOUNTS)) {
      const account = await Account.updateOrCreate(
        { username: data.username },
        { password: data.password }
      )

      await account.related('profile').updateOrCreate(
        {},
        {
          firstName: data.profile.firstName,
          lastName: data.profile.lastName,
          birthDate: data.profile.birthDate,
        }
      )

      for (const contact of data.contacts) {
        await account
          .related('contacts')
          .updateOrCreate({ contactTypeId: contact.contactTypeId }, { value: contact.value })
      }

      await account.related('roles').sync(data.roles)
    }
  }
}
