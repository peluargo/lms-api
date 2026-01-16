import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Account from '#models/account'

export default class Profile extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare accountId: number

  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @column()
  declare birthDate: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Account)
  declare account: BelongsTo<typeof Account>
}
