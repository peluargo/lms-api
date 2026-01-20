import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Account from '#models/account'
import { DateTime } from 'luxon'
import { ContactTypes } from '#models/contact_type'
import { Roles } from '#models/role'

export default class extends BaseSeeder {
  static environment = ['development']

  async run() {
    const admin = await Account.updateOrCreate(
      { username: 'system.administrator' },
      { password: '9a0r2g5E$0TK' }
    )
    await admin.related('profile').updateOrCreate(
      {},
      {
        firstName: 'System',
        lastName: 'Administrator',
        birthDate: DateTime.fromISO('1999-12-31'),
      }
    )
    await admin
      .related('contacts')
      .updateOrCreate(
        { contactTypeId: ContactTypes.EMAIL },
        { value: 'system.administrator@localhost.com' }
      )
    await admin.related('roles').sync([Roles.SYSTEM_ADMINISTRATOR])

    const employee = await Account.updateOrCreate(
      { username: 'employee.raccoon' },
      { password: '9a0r2g5E$0TK' }
    )
    await employee.related('profile').updateOrCreate(
      {},
      {
        firstName: 'Employee',
        lastName: 'Raccoon',
        birthDate: DateTime.fromISO('1999-12-31'),
      }
    )
    await employee
      .related('contacts')
      .updateOrCreate(
        { contactTypeId: ContactTypes.EMAIL },
        { value: 'employee.raccoon@localhost.com' }
      )
    await employee.related('roles').sync([Roles.EMPLOYEE])

    const student = await Account.updateOrCreate(
      { username: 'student.ant' },
      { password: '9a0r2g5E$0TK' }
    )
    await student.related('profile').updateOrCreate(
      {},
      {
        firstName: 'Student',
        lastName: 'Ant',
        birthDate: DateTime.fromISO('1999-12-31'),
      }
    )
    await student
      .related('contacts')
      .updateOrCreate({ contactTypeId: ContactTypes.EMAIL }, { value: 'student.ant@localhost.com' })
    await student.related('roles').sync([Roles.STUDENT])
  }
}
