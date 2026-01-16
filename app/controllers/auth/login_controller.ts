import Account from '#models/account'
import { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'

export default class LoginController {
  async store({ request, response }: HttpContext) {
    const { username, password } = request.only(['username', 'password'])

    // 1. Busca o usuário pelo username
    const account = await Account.findBy('username', username)

    // 2. Se não existir ou a senha não bater
    if (!account || !(await hash.verify(account.password, password))) {
      return response.unauthorized('Invalid credentials')
    }

    // 3. Gerar o token
    const token = await Account.accessTokens.create(account)

    return response.ok({
      type: 'bearer',
      value: token.value!.release(),
    })
  }
}
