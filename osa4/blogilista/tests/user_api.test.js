const { test, after, describe, beforeEach } = require('node:test')
const assert = require('assert')
const User = require('../models/user')
const helper = require('./test_helper')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

beforeEach( async() => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('salasana', 10)
  const user = new User({ username: 'root', passwordHash })
  user.save()
})

describe('creating a new user', () => {
  test('succeeeds with response 201', async () => {
    await api
      .post('/api/users')
      .send({ username: 'bingus', password: 'passwd' })
      .expect(201)
      .expect('content-type', /application\/json/)
  })
  
  test('with a username already in use fails with response 400', async () => {
    await api
      .post('/api/users')
      .send({ username: 'root', password: 'passwd' })
      .expect(400, {
        error: 'username should be unique'
      })
  })

  test('without a username fails with response 400', async () => {
    await api
      .post('/api/users')
      .send({ username: '', password: 'passwd' })
      .expect(400, {
        error: 'User validation failed: username: Path `username` is required.'
      })
  })
  
  test('without a password fails with response 400', async () => {
    await api
      .post('/api/users')
      .send({ username: 'root', password: '' })
      .expect(400, {
        error: 'password required'
      })
  })
  
  test('with a too short password fails with response 400', async () => {
    await api
      .post('/api/users')
      .send({ username: 'root', password: '1' })
      .expect(400, {
        error: 'minimun password length is 3 characters'
      })
  })
})



after(async () => {
  await mongoose.connection.close()
})