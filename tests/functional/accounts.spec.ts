import { test } from '@japa/runner'
import Account from '#models/account'
import { ContactTypes } from '#models/contact_type'

test.group('Accounts | Create', () => {
  test('deve criar uma conta completa com perfil e contatos', async ({ client, assert }) => {
    const payload = {
      username: 'john.doe',
      password: 'S3cr3tP4ssw0rd@App',
      password_confirmation: 'S3cr3tP4ssw0rd@App',
      profile: {
        firstName: 'John',
        lastName: 'Doe',
        birthDate: '1999-12-31',
      },
      contacts: [
        { contact_type_id: ContactTypes.EMAIL, value: 'john.doe@example.com' },
        { contact_type_id: ContactTypes.MOBILE, value: '+5511999999999' },
      ],
    }

    const response = await client.post('/api/v1/accounts').json(payload)

    response.assertStatus(201)
    response.assertBodyContains({
      message: 'User registered successfully',
      data: { username: 'john.doe' },
    })

    const account = await Account.query()
      .where('username', 'john.doe')
      .preload('profile')
      .preload('contacts')
      .firstOrFail()

    // Account
    assert.equal(account.username, 'john.doe')

    // Profile
    assert.equal(account.profile.firstName, 'John')
    assert.equal(account.profile.lastName, 'Doe')
    assert.equal(account.profile.birthDate.toISODate(), '1999-12-31')

    // Contacts
    assert.lengthOf(account.contacts, 2)
    assert.equal(Number(account.contacts[0].contactTypeId), ContactTypes.EMAIL)
    assert.equal(account.contacts[0].value, 'john.doe@example.com')
    assert.equal(Number(account.contacts[1].contactTypeId), ContactTypes.MOBILE)
    assert.equal(account.contacts[1].value, '+5511999999999')
  })

  test('deve falhar ao tentar registrar sem contatos (undefined)', async ({ client }) => {
    const payload = {
      username: 'john.doe',
      password: 'S3cr3tP4ssw0rd@App',
      password_confirmation: 'S3cr3tP4ssw0rd@App',
      profile: {
        firstName: 'John',
        lastName: 'Doe',
        birthDate: '1999-12-31',
      },
    }

    const response = await client.post('/api/v1/accounts').json(payload)

    response.assertStatus(422)
  })

  test('deve falhar ao tentar registrar sem contatos (null)', async ({ client }) => {
    const payload = {
      username: 'john.doe',
      password: 'S3cr3tP4ssw0rd@App',
      password_confirmation: 'S3cr3tP4ssw0rd@App',
      profile: {
        firstName: 'John',
        lastName: 'Doe',
        birthDate: '1999-12-31',
      },
      contacts: null,
    }

    const response = await client.post('/api/v1/accounts').json(payload)

    response.assertStatus(422)
  })

  test('deve falhar ao tentar registrar sem contatos (empty)', async ({ client }) => {
    const payload = {
      username: 'john.doe',
      password: 'S3cr3tP4ssw0rd@App',
      password_confirmation: 'S3cr3tP4ssw0rd@App',
      profile: {
        firstName: 'John',
        lastName: 'Doe',
        birthDate: '1999-12-31',
      },
      contacts: [],
    }

    const response = await client.post('/api/v1/accounts').json(payload)

    response.assertStatus(422)
  })

  test('deve falhar ao tentar registrar sem e-mail', async ({ client }) => {
    const payload = {
      username: 'john.doe',
      password: 'S3cr3tP4ssw0rd@App',
      password_confirmation: 'S3cr3tP4ssw0rd@App',
      profile: {
        firstName: 'John',
        lastName: 'Doe',
        birthDate: '1999-12-31',
      },
      contacts: [{ contact_type_id: ContactTypes.MOBILE, value: '+5511999999999' }],
    }

    const response = await client.post('/api/v1/accounts').json(payload)

    response.assertStatus(422)
  })

  test('deve falhar ao tentar registrar com username duplicado', async ({ client }) => {
    const payloadFirstAccount = {
      username: 'john.doe',
      password: 'S3cr3tP4ssw0rd@App',
      password_confirmation: 'S3cr3tP4ssw0rd@App',
      profile: {
        firstName: 'John',
        lastName: 'Doe',
        birthDate: '1999-12-31',
      },
      contacts: [
        { contact_type_id: ContactTypes.EMAIL, value: 'john.doe@example.com' },
        { contact_type_id: ContactTypes.MOBILE, value: '+5511999999999' },
      ],
    }
    await client.post('/api/v1/accounts').json(payloadFirstAccount)

    const payloadSecondAccount = {
      username: 'john.doe',
      password: 'S3cr3tP4ssw0rd@App',
      password_confirmation: 'S3cr3tP4ssw0rd@App',
      profile: {
        firstName: 'Johnathan',
        lastName: 'Doe',
        birthDate: '1999-12-31',
      },
      contacts: [{ type: ContactTypes.EMAIL, value: 'johnathan.doe@example.com' }],
    }

    const response = await client.post('/api/v1/accounts').json(payloadSecondAccount)

    response.assertStatus(422)
  })

  test('deve falhar ao tentar registrar com e-mail duplicado', async ({ client }) => {
    const payloadFirstAccount = {
      username: 'john.doe',
      password: 'S3cr3tP4ssw0rd@App',
      password_confirmation: 'S3cr3tP4ssw0rd@App',
      profile: {
        firstName: 'John',
        lastName: 'Doe',
        birthDate: '1999-12-31',
      },
      contacts: [
        { contact_type_id: ContactTypes.EMAIL, value: 'john.doe@example.com' },
        { contact_type_id: ContactTypes.MOBILE, value: '+5511999999999' },
      ],
    }
    await client.post('/api/v1/accounts').json(payloadFirstAccount)

    const payloadSecondAccount = {
      username: 'jana.doe',
      password: 'S3cr3tP4ssw0rd@App',
      password_confirmation: 'S3cr3tP4ssw0rd@App',
      profile: {
        firstName: 'Jana',
        lastName: 'Doe',
        birthDate: '1999-12-31',
      },
      contacts: [{ type: ContactTypes.EMAIL, value: 'john.doe@example.com' }],
    }

    const response = await client.post('/api/v1/accounts').json(payloadSecondAccount)

    response.assertStatus(422)
  })
})
