import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import Account from '#models/account'

export enum Roles {
  SYSTEM_ADMINISTRATOR = 1,
  EMPLOYEE = 2,
  TEACHER = 3,
  STUDENT = 4,
  GUARDIAN = 5,
}

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @manyToMany(() => Account, {
    pivotTable: 'accounts_roles',
    pivotForeignKey: 'role_id',
    pivotRelatedForeignKey: 'account_id',
    pivotTimestamps: true,
  })
  declare accounts: ManyToMany<typeof Account>
}
