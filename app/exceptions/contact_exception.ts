import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'
import type { ContactError } from '#constants/errors'

export default class ContactException extends Exception {
  constructor(error: ContactError) {
    super(error.message, {
      status: error.status,
      code: error.code,
    })
  }

  async handle(_: this, { response }: HttpContext) {
    response.status(this.status).send({
      errors: [
        {
          code: this.code,
          message: this.message,
          status: this.status,
        },
      ],
    })
  }
}
