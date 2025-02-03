const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')

commentsRouter.post('/:id/comments', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  const comment = new Comment(request.body)

    try {
      blog.comments = blog?.comments?.concat(comment._id) ?? [ comment._id ]
      comment.blog = blog._id

      await blog.save()
      const savedComment = await comment.save()
      response.status(201).json(savedComment)
    } catch (exception) {
      next(exception)
    }
})

module.exports = commentsRouter