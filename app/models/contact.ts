import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Account from '#models/account'
import { ContactTypes } from '#enums/contact_types'

export default class Contact extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare accountId: number

  @column()
  declare type: ContactTypes

  @column()
  declare value: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Account)
  declare account: BelongsTo<typeof Account>
}
