import type { HttpContext } from '@adonisjs/core/http'
import { updateProfileValidator } from '#validators/profile'

export default class ProfilesController {
  async show({ auth, response }: HttpContext) {
    const user = auth.user!

    await user.load((loader) => {
      loader.load('roles').load('contacts')
    })

    return response.ok(user)
  }

  async update({ request, auth, response }: HttpContext) {
    const user = auth.user!
    const payload = await request.validateUsing(updateProfileValidator)

    user.merge(payload)
    await user.save()

    // TODO: Definir DTO de retorno
    return response.ok({
      message: 'Profile updated successfully',
      data: user,
    })
  }
}
