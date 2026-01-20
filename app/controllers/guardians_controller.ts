import { HttpContext } from '@adonisjs/core/http'
import Account from '#models/account'

export default class GuardiansController {
  async store({ request, response }: HttpContext) {
    const { guardianAccountId, accountId } = request.only(['guardianAccountId', 'accountId'])

    const guardian = await Account.find(guardianAccountId)
    const account = await Account.find(accountId)

    if (!guardian || !account) {
      return response.badRequest({ message: 'One or both accounts do not exist' })
    }

    await guardian.related('accounts').attach([account.id])

    // TODO: Definir DTO de retorno
    return response.created({
      message: 'Successfully linked accounts',
      data: {
        guardian: guardian.username,
        account: account.username,
      },
    })
  }
}
