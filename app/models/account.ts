import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, hasMany, manyToMany, beforeSave } from '@adonisjs/lucid/orm'
import type { HasOne, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Profile from '#models/profile'
import Contact from '#models/contact'
import hash from '@adonisjs/core/services/hash'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import Role, { Roles } from '#models/role'

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

  @hasOne(() => Profile)
  declare profile: HasOne<typeof Profile>

  @hasMany(() => Contact)
  declare contacts: HasMany<typeof Contact>

  @manyToMany(() => Role, {
    pivotTable: 'accounts_roles',
    pivotForeignKey: 'account_id',
    pivotRelatedForeignKey: 'role_id',
    pivotTimestamps: true,
  })
  declare roles: ManyToMany<typeof Role>

  @manyToMany(() => Account, {
    pivotTable: 'guardians',
    pivotForeignKey: 'account_id',
    pivotRelatedForeignKey: 'guardian_account_id',
    pivotTimestamps: true,
  })
  declare guardians: ManyToMany<typeof Account>

  @manyToMany(() => Account, {
    pivotTable: 'guardians',
    pivotForeignKey: 'guardian_account_id',
    pivotRelatedForeignKey: 'account_id',
    pivotTimestamps: true,
  })
  declare accounts: ManyToMany<typeof Account>

  @beforeSave()
  public static async hashPassword(account: Account) {
    if (account.$dirty.password) {
      account.password = await hash.make(account.password)
    }
  }

  hasRole(roleId: Roles): boolean {
    if (!this.roles) return false
    return this.roles.some((role) => role.id === roleId)
  }

  hasGuardian(): boolean {
    return this.guardians.length > 0
  }

  isGuardianOf(account: Account): boolean {
    if (this.accounts.length === 0 || !account.hasGuardian()) return false
    return this.accounts.some((accountGuardian) => accountGuardian.id === account.id)
  }

  static accessTokens = DbAccessTokensProvider.forModel(Account)
}
