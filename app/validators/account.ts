import vine from '@vinejs/vine'
import { ContactTypes } from '#enums/contact_types'
import { DateTime } from 'luxon'
import { Infer } from '@vinejs/vine/types'

export const createAccountValidator = vine.compile(
  vine.object({
    username: vine
      .string()
      .trim()
      .regex(/^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/)
      .unique(async (db, value) => {
        const match = await db.from('accounts').where('username', value).first()
        return !match
      }),

    password: vine.string().minLength(8).confirmed(),

    profile: vine.object({
      firstName: vine.string().trim().minLength(2),
      lastName: vine.string().trim().minLength(2),
      birthDate: vine
        .date({ formats: ['YYYY-MM-DD'] })
        .transform((value) => DateTime.fromJSDate(value)),
    }),

    contacts: vine
      .array(
        vine.object({
          type: vine.enum([ContactTypes.EMAIL, ContactTypes.PHONE]),
          // Validamos como string básica aqui e aplicamos a lógica condicional
          value: vine
            .string()
            .trim()
            .minLength(3)
            .transform((value, field) => {
              // Se o tipo for e-mail, validamos o formato manualmente ou via regex
              const data = field.parent
              if (data.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                field.report('The email format is invalid', 'email', field)
              }
              return value
            }),
        })
      )
      .minLength(1),
  })
)

export type CreateAccountPayload = Infer<typeof createAccountValidator>
