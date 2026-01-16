/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const RegisterController = () => import('#controllers/auth/register_controller')
const LoginController = () => import('#controllers/auth/login_controller')
import { middleware } from '#start/kernel'

router
  .group(() => {
    // Rotas Públicas
    router.post('register', [RegisterController, 'store'])
    router.post('login', [LoginController, 'store'])

    // Rotas Protegidas (Exigem Token)
    router
      .group(() => {
        router.get('me', async ({ auth }) => {
          return auth.getUserOrFail()
        })
      })
      .use(middleware.auth())
  })
  .prefix('api/v1')
