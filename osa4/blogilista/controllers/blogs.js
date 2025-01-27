const blogsRouter = require('express').Router()
const { userExtractor } = require('../utils/middleware')
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .populate('user', { username: 1, name: 1, id: 1 })
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', userExtractor, (request, response, next) => {
  const blog = new Blog(request.body)
  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'invalid token' })
  }

  if(!request.body.hasOwnProperty('likes')) {
    blog.likes = 0
  }

  blog.user = user._id
  user.blogs = user.blogs.concat(blog._id)
  return Promise.all([blog.save(), user.save()])
  .then(results => {
    return results[0].populate('user', { username: 1, name: 1, id: 1 })
  }).then(savedBlog => {
    response.status(201).json(savedBlog)
  })
  .catch(error => next(error))
})

blogsRouter.delete('/:id', userExtractor, async (request, response, next) => {
  try {
    const user = request.user
  
    if (!user) {
      return response.status(401).json({ error: 'invalid token' })
    }

    const blog = await Blog.findById(request.params.id)
    
    if (blog.user.toString() !== user._id.toString()) {
      return response.status(401).json({ error : 'no permission to delete blog' })
    }

    await Blog.findByIdAndDelete(request.params.id)
    user.blogs = user.blogs.filter(item => item._id !== blog._id)
    await user.save()
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  try {
    const newBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true, context: 'query' }).populate('user', { username: 1, name: 1, id: 1 })
    
    response.json(newBlog)
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter
