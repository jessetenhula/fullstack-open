const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')

usersRouter.get('/', (request, response) => {
  User
    .find({})
    .populate('blogs', { url: 1, title: 1, author: 1, id: 1 })
    .then(users => {
      response.json(users)
    })
})

usersRouter.post('/', (request, response, next) => {
  const { username, name , password} = request.body

  if(!password) {
    return response.status(400).json({ error: "password required"})
  } else if (password.length < 3) {
    return response.status(400).json({ error: "minimun password length is 3 characters"})
  }

  const saltRounds = 10
  bcrypt.hash(password, saltRounds, (err, passwordHash) => {
    const user = new User({
      username,
      name,
      passwordHash
    })

    user
      .save()
      .then((savedUser) => {
        response.status(201).json(savedUser)
      })
      .catch(error => {
        next(error)
      })
  })
})

module.exports = usersRouter