import { test } from '@japa/runner'
import { ContactTypes } from '#enums/contact_types'
import Account from '#models/account'

test.group('Auth | Register', () => {
  test('deve criar uma conta completa com perfil e contatos', async ({ client, assert }) => {
    // 1. Dados de exemplo
    const payload = {
      username: 'john.doe',
      password: 'secretPassword123',
      password_confirmation: 'secretPassword123', // Necessário devido ao .confirmed() no validator
      profile: {
        firstName: 'John',
        lastName: 'Doe',
        birthDate: '1999-12-31',
      },
      contacts: [
        { type: ContactTypes.EMAIL, value: 'john.doe@example.com' },
        { type: ContactTypes.PHONE, value: '11999999999' },
      ],
    }

    // 2. Executar a requisição
    const response = await client.post('/api/v1/register').json(payload)

    // 3. Asserções da Resposta HTTP
    response.assertStatus(201)
    response.assertBodyContains({
      message: 'User registered successfully',
      data: { username: 'john.doe' },
    })

    // 4. Verificação no Banco de Dados (A prova real)
    const account = await Account.query()
      .where('username', 'john.doe')
      .preload('profile')
      .preload('contacts')
      .firstOrFail()

    assert.equal(account.username, 'john.doe')
    assert.equal(account.profile.firstName, 'John')
    assert.lengthOf(account.contacts, 2)
    assert.equal(Number(account.contacts[0].type), ContactTypes.EMAIL)
  })

  test('deve falhar ao tentar registrar com username duplicado', async ({ client }) => {
    // Criamos um usuário primeiro
    await Account.create({ username: 'duplicate.user', password: 'password123' })

    const payload = {
      username: 'duplicate.user',
      password: 'password123',
      password_confirmation: 'password123',
      profile: {
        firstName: 'Test',
        lastName: 'User',
        birthDate: '1990-01-01',
      },
      contacts: [{ type: ContactTypes.EMAIL, value: 'test@test.com' }],
    }

    const response = await client.post('/api/v1/register').json(payload)

    // Deve retornar erro de validação (422 Unprocessable Entity)
    response.assertStatus(422)
  })
})
