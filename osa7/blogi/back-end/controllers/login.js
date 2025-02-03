const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', (request, response) => {
  const { username, password} = request.body

  User
    .findOne({ username })
    .then(user => {
      const authenticated = user === null
        ? false
        : bcrypt.compare(password, user.passwordHash)

      return Promise.all([user, authenticated])
    })
    .then(([user, authenticated]) => {
      if(!(user && authenticated)) {
        return response.status(401).json({ error: 'invalid username or password' })
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      const token = jwt.sign(userForToken, process.env.SECRET)

      response
        .status(200)
        .send({ token, username: user.username, name: user.name })
    })
})

module.exports = loginRouter