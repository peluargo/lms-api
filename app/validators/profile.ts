import vine from '@vinejs/vine'
import { DateTime } from 'luxon'

export const profileSchema = vine.object({
  firstName: vine.string().trim().minLength(2).maxLength(255),
  lastName: vine.string().trim().minLength(2).maxLength(255),
  birthDate: vine.date().transform((value) => DateTime.fromJSDate(value)),
})

export const updateProfileValidator = vine.object({
  firstName: vine.string().trim().minLength(2).maxLength(255).optional(),
  lastName: vine.string().trim().minLength(2).maxLength(255).optional(),
  birthDate: vine.date().optional(),
})
