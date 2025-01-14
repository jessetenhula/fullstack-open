const User = require('../models/user')
const jwt = require('jsonwebtoken')

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted id'})
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message})
  }
  if (error.name === 'MongoServerError') {
    return response.status(400).json({ error: 'username should be unique'})
  }
  if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid or missing token'})
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')

  request.token = authorization && authorization.startsWith('Bearer ')
    ? authorization.replace('Bearer ', '')
    : null
  
  next()
}

const userExtractor = async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    request.user = await User.findById(decodedToken.id)
    next()
  } catch (exception) {
    next(exception)
  } 
}

module.exports = {
  errorHandler,
  tokenExtractor,
  userExtractor
}