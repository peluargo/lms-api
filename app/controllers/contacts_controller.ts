import type { HttpContext } from '@adonisjs/core/http'
import Contact from '#models/contact'
import { ContactTypes } from '#models/contact_type'
import ContactException from '#exceptions/contact_exception'
import { ContactError } from '#constants/errors'
import { contactValidator } from '#validators/contact'

export default class ContactsController {
  async store({ request, response, auth }: HttpContext) {
    const user = auth.user!
    const payload = await request.validateUsing(contactValidator)

    if (payload.contact_type_id === ContactTypes.EMAIL) {
      const existingEmail = await user
        .related('contacts')
        .query()
        .where('contact_type_id', ContactTypes.EMAIL)
        .first()

      if (existingEmail) {
        throw new ContactException(ContactError.ALREADY_HAS_EMAIL)
      }
    }

    const contact = await user.related('contacts').create(payload)
    return response.created(contact)
  }

  async update({ params, request, bouncer }: HttpContext) {
    const contact = await Contact.findOrFail(params.id)

    await bouncer.with('ContactPolicy').authorize('update', contact)

    const payload = await request.validateUsing(contactValidator)

    // RN: Impedir mudar de EMAIL para PHONE se for o e-mail principal
    if (
      contact.contactTypeId === ContactTypes.EMAIL &&
      payload.contact_type_id !== ContactTypes.EMAIL
    ) {
      throw new ContactException(ContactError.EMAIL_TYPE_CHANGE)
    }

    contact.merge(payload)
    await contact.save()

    return contact
  }

  async destroy({ params, bouncer, response }: HttpContext) {
    const contact = await Contact.findOrFail(params.id)

    await bouncer.with('ContactPolicy').authorize('delete', contact)

    // RN: Impedir a remoção do contato de e-mail
    if (contact.contactTypeId === ContactTypes.EMAIL) {
      throw new ContactException(ContactError.LAST_EMAIL_REMOVAL)
    }

    await contact.delete()
    return response.noContent()
  }
}
