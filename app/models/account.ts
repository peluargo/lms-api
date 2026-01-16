import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, hasMany, manyToMany, beforeSave } from '@adonisjs/lucid/orm'
import type { HasOne, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Profile from '#models/profile'
import Contact from '#models/contact'
import hash from '@adonisjs/core/services/hash'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'

export default class Account extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare username: string

  @column({ serializeAs: null })
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relacionamentos
  @hasOne(() => Profile)
  declare profile: HasOne<typeof Profile>

  @hasMany(() => Contact)
  declare contacts: HasMany<typeof Contact>

  @manyToMany(() => Account, {
    pivotTable: 'guardians',
    pivotForeignKey: 'student_id',
    pivotRelatedForeignKey: 'guardian_id',
    pivotTimestamps: true,
  })
  declare guardians: ManyToMany<typeof Account>

  @manyToMany(() => Account, {
    pivotTable: 'guardians',
    pivotForeignKey: 'guardian_id',
    pivotRelatedForeignKey: 'student_id',
    pivotTimestamps: true,
  })
  declare students: ManyToMany<typeof Account>

  @beforeSave()
  public static async hashPassword(account: Account) {
    if (account.$dirty.password) {
      account.password = await hash.make(account.password)
    }
  }

  static accessTokens = DbAccessTokensProvider.forModel(Account)
}
