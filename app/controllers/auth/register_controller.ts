import Account from '#models/account'
import { createAccountValidator } from '#validators/account'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class RegisterController {
  async store({ request, response }: HttpContext) {
    // 1. Validar os dados de entrada com o VineJS
    const payload = await request.validateUsing(createAccountValidator)

    // 2. Iniciar a transação
    const transaction = await db.transaction()

    try {
      // 3. Criar a conta (Account) vinculada à transação
      const account = new Account()
      account.username = payload.username
      account.password = payload.password

      account.useTransaction(transaction)
      await account.save()

      // 4. Criar o perfil (Profile) usando o relacionamento
      // O Adonis preenche o account_id automaticamente aqui
      await account.related('profile').create(payload.profile)

      // 5. Criar os múltiplos contatos (Contacts)
      await account.related('contacts').createMany(payload.contacts)

      // 6. Se tudo deu certo, confirma no banco
      await transaction.commit()

      return response.created({
        message: 'User registered successfully',
        data: {
          id: account.id,
          username: account.username,
        },
      })
    } catch (error) {
      // 7. Se houver erro, desfaz qualquer inserção parcial
      await transaction.rollback()

      return response.badRequest({
        message: 'Could not create account',
        error: error.message,
      })
    }
  }
}
