export const ContactError = {
  LAST_EMAIL_REMOVAL: {
    code: 'E_LAST_EMAIL_REMOVAL',
    status: 400,
    message: 'The primary email contact cannot be removed.',
  },
  EMAIL_TYPE_CHANGE: {
    code: 'E_EMAIL_TYPE_CHANGE',
    status: 400,
    message: 'Cannot change the type of the primary email contact.',
  },
  ALREADY_HAS_EMAIL: {
    code: 'E_ALREADY_HAS_EMAIL',
    status: 400,
    message: 'This account already has a primary email contact.',
  },
} as const

export type ContactError = (typeof ContactError)[keyof typeof ContactError]
