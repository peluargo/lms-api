import vine from '@vinejs/vine'
import { ContactTypes } from '#models/contact_type'

const emailSchema = vine.string().trim().email()
const mobileSchema = vine.string().trim().mobile({ strictMode: true })

const emailValidator = vine.compile(emailSchema)
const mobileValidator = vine.compile(mobileSchema)

const contactValueRule = vine.createRule(async (value, _, field) => {
  const data = field.parent
  const typeId = data.contact_type_id

  if (typeof value !== 'string') return

  try {
    if (typeId === ContactTypes.EMAIL) {
      await emailValidator.validate(value)
    }

    if (typeId === ContactTypes.MOBILE) {
      await mobileValidator.validate(value)
    }
  } catch (error) {
    field.report('Given contact is not valid for the desired contact type', 'contact_value', field)
  }
})

export const contactSchema = vine.object({
  contact_type_id: vine.number().exists({ table: 'contact_types', column: 'id' }),
  value: vine.string().use(contactValueRule()),
})

export const contactValidator = vine.compile(contactSchema)
