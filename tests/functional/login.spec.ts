import { test } from '@japa/runner'
import { ContactTypes } from '#models/contact_type'

test.group('Auth | Login', () => {
  test('deve retornar um token ao fazer login com credenciais válidas', async ({
    client,
    assert,
  }) => {
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
    await client.post('/api/v1/accounts').json(payload)

    const response = await client.post('/api/v1/login').json({
      username: 'john.doe',
      password: 'S3cr3tP4ssw0rd@App',
    })

    response.assertStatus(200)
    response.assertBodyContains({
      type: 'bearer',
    })

    assert.exists(response.body().value)
  })

  test('deve falhar ao fazer login com senha incorreta', async ({ client }) => {
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
    await client.post('/api/v1/accounts').json(payload)

    const response = await client.post('/api/v1/login').json({
      username: 'john.doe',
      password: 'wrong_password',
    })

    response.assertStatus(401)
  })

  test('deve falhar ao fazer login com usuário incorreto', async ({ client }) => {
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
    await client.post('/api/v1/accounts').json(payload)

    const response = await client.post('/api/v1/login').json({
      username: 'johndoe',
      password: 'S3cr3tP4ssw0rd@App',
    })

    response.assertStatus(401)
  })
})
