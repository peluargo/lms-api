/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const LoginController = () => import('#controllers/login_controller')
const GuardiansController = () => import('#controllers/guardians_controller')
const AccountsController = () => import('#controllers/accounts_controller')
import { middleware } from '#start/kernel'

router
  .group(() => {
    router.post('accounts', [AccountsController, 'store'])
    router.post('login', [LoginController, 'store'])

    // Rotas Protegidas (Exigem Token)
    router
      .group(() => {
        // router.get('me', async ({ auth }) => {
        //   return auth.getUserOrFail()
        // })

        router.post('guardians', [GuardiansController, 'store'])
      })
      .use(middleware.auth())
  })
  .prefix('api/v1')
