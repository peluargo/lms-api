import Account from '#models/account'
import { BasePolicy } from '@adonisjs/bouncer'
import { Roles } from '#models/role'

export default class GuardianPolicy extends BasePolicy {
  create(account: Account) {
    return account.hasRole(Roles.EMPLOYEE)
  }
  delete(account: Account) {
    return account.hasRole(Roles.EMPLOYEE)
  }
}
