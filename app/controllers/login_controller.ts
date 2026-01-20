import Account from '#models/account'
import { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'

export default class LoginController {
  async store({ request, response }: HttpContext) {
    const { username, password } = request.only(['username', 'password'])

    const account = await Account.findBy('username', username)

    if (!account || !(await hash.verify(account.password, password))) {
      return response.unauthorized('Invalid credentials')
    }

    const token = await Account.accessTokens.create(account)

    // TODO: Definir DTO de retorno
    return response.ok({
      type: 'bearer',
      value: token.value!.release(),
    })
  }
}
