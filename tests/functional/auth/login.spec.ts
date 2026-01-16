import { test } from '@japa/runner'
import Account from '#models/account'

test.group('Auth | Login', () => {
  test('deve retornar um token ao fazer login com credenciais válidas', async ({
    client,
    assert,
  }) => {
    // 1. Criar um usuário de teste no banco
    await Account.create({
      username: 'test.user',
      password: 'password123', // O @beforeSave no Model fará o hash automaticamente
    })
    // 2. Tentar fazer login
    const response = await client.post('/api/v1/login').json({
      username: 'test.user',
      password: 'password123',
    })

    // 3. Asserções
    response.assertStatus(200)
    response.assertBodyContains({
      type: 'bearer',
    })

    // Verifica se o valor do token foi retornado (não é nulo)
    assert.exists(response.body().value)
  })

  test('deve falhar ao fazer login com senha incorreta', async ({ client }) => {
    await Account.create({
      username: 'wrong.password.user',
      password: 'correct_password',
    })

    const response = await client.post('/api/v1/login').json({
      username: 'wrong.password.user',
      password: 'wrong_password',
    })

    response.assertStatus(401) // Unauthorized
  })

  test('deve acessar uma rota protegida usando o token gerado', async ({ client }) => {
    await Account.create({
      username: 'auth.user',
      password: 'password123',
    })
    // Login para pegar o token
    const loginResponse = await client.post('/api/v1/login').json({
      username: 'auth.user',
      password: 'password123',
    })

    const token = loginResponse.body().value

    // Tentar acessar rota protegida (/me)
    const response = await client.get('/api/v1/me').bearerToken(token)

    response.assertStatus(200)
    response.assertBodyContains({ username: 'auth.user' })
  })
})
