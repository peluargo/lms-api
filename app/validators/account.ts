import vine from '@vinejs/vine'
import { contactSchema } from '#validators/contact'
import { profileSchema } from '#validators/profile'

export const registerAccountValidator = vine.compile(
  vine.object({
    username: vine.string().trim().minLength(3).unique({ table: 'accounts', column: 'username' }),
    password: vine.string().minLength(8).confirmed(), // Espera um campo password_confirmation
    profile: profileSchema,
    contacts: vine.array(contactSchema).minLength(1).distinct('value'),
  })
)
