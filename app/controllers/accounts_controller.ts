import Account from '#models/account'
import { registerAccountValidator } from '#validators/account'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class AccountsController {
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(registerAccountValidator)

    const transaction = await db.transaction()

    try {
      const account = new Account()
      account.username = payload.username
      account.password = payload.password

      account.useTransaction(transaction)

      await account.save()
      await account.related('profile').create(payload.profile)
      await account.related('contacts').createMany(payload.contacts)

      await transaction.commit()

      return response.created({
        message: 'User registered successfully',
        data: {
          id: account.id,
          username: account.username,
        },
      })
    } catch (error) {
      await transaction.rollback()

      return response.badRequest({
        message: 'Could not create account',
        error: error.message,
      })
    }
  }
}
