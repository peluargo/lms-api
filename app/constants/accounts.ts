import { DateTime } from 'luxon'
import { ContactTypes } from '#models/contact_type'
import { Roles } from '#models/role'

const RACCOON_ADMINISTRATOR = {
  username: 'raccoon.administrator',
  password: 'S3cr3tP4ssw0rd@App',
  profile: {
    firstName: 'Raccoon',
    lastName: 'Administrator',
    birthDate: DateTime.fromISO('1999-12-31'),
  },
  contacts: [
    {
      contactTypeId: ContactTypes.EMAIL,
      value: 'raccoon.administrator@localhost.com',
    },
  ],
  roles: [Roles.SYSTEM_ADMINISTRATOR],
}

const DEER_EMPLOYEE = {
  username: 'deer.employee',
  password: 'S3cr3tP4ssw0rd@App',
  profile: {
    firstName: 'Deer',
    lastName: 'Employee',
    birthDate: DateTime.fromISO('1999-12-31'),
  },
  contacts: [
    {
      contactTypeId: ContactTypes.EMAIL,
      value: 'deer.employee@localhost.com',
    },
  ],
  roles: [Roles.EMPLOYEE],
}

const OWL_TEACHER = {
  username: 'owl.teacher',
  password: 'S3cr3tP4ssw0rd@App',
  profile: {
    firstName: 'Owl',
    lastName: 'Teacher',
    birthDate: DateTime.fromISO('1999-12-31'),
  },
  contacts: [
    {
      contactTypeId: ContactTypes.EMAIL,
      value: 'owl.teacher@localhost.com',
    },
  ],
  roles: [Roles.TEACHER],
}

const KITTEN_STUDENT = {
  username: 'kitten.student',
  password: 'S3cr3tP4ssw0rd@App',
  profile: {
    firstName: 'Kitten',
    lastName: 'Student',
    birthDate: DateTime.fromISO('1999-12-31'),
  },
  contacts: [
    {
      contactTypeId: ContactTypes.EMAIL,
      value: 'kitten.student@localhost.com',
    },
  ],
  roles: [Roles.STUDENT],
}

const TORTOISE_GUARDIAN = {
  username: 'tortoise.guardian',
  password: 'S3cr3tP4ssw0rd@App',
  profile: {
    firstName: 'Tortoise',
    lastName: 'Guardian',
    birthDate: DateTime.fromISO('1999-12-31'),
  },
  contacts: [
    {
      contactTypeId: ContactTypes.EMAIL,
      value: 'tortoise.guardian@localhost.com',
    },
  ],
  roles: [Roles.GUARDIAN],
}

export const ACCOUNTS = {
  RACCOON_ADMINISTRATOR,
  DEER_EMPLOYEE,
  OWL_TEACHER,
  KITTEN_STUDENT,
  TORTOISE_GUARDIAN,
}
