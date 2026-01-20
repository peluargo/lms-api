import Account from '#models/account'
import Contact from '#models/contact'
import { BasePolicy } from '@adonisjs/bouncer'
import { Roles } from '#models/role'

export default class ContactPolicy extends BasePolicy {
  read(account: Account, contact: Contact) {
    return (
      account.id === contact.accountId ||
      account.hasRole(Roles.EMPLOYEE) ||
      (account.hasRole(Roles.GUARDIAN) && account.isGuardianOf(contact.account))
    )
  }
  create(account: Account, contact: Contact) {
    return (
      account.id === contact.accountId ||
      account.hasRole(Roles.EMPLOYEE) ||
      (account.hasRole(Roles.GUARDIAN) && account.isGuardianOf(contact.account))
    )
  }
  update(account: Account, contact: Contact) {
    return (
      account.id === contact.accountId ||
      account.hasRole(Roles.EMPLOYEE) ||
      (account.hasRole(Roles.GUARDIAN) && account.isGuardianOf(contact.account))
    )
  }
  delete(account: Account, contact: Contact) {
    return (
      account.id === contact.accountId ||
      account.hasRole(Roles.EMPLOYEE) ||
      (account.hasRole(Roles.GUARDIAN) && account.isGuardianOf(contact.account))
    )
  }
}
