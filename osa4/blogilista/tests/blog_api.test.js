const { test, after, describe, beforeEach } = require('node:test')
const assert = require('assert')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

let token 

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const testUser = new User({
    username: "testUser",
    name: "test",
    passwordHash: "_",
    blogs: []
  })
  
  await testUser.save()

  await Blog.insertMany(helper.initialBlogs.map(blog => {
    return { 
      ...blog, 
      user: testUser._id 
    }
  }))
  
  const testUserForToken = {
    username: testUser.username,
    id: testUser._id
  }

  token = jwt.sign(testUserForToken, process.env.SECRET)
})

describe('when database contains right data initially', () => {
  test('blogs are returned as json', async () => {
    console.log(token)
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('content-type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('blogs contain "id" field instead of "_id"', async () => {
    const response = await api.get('/api/blogs')

    assert(response.body[0].hasOwnProperty('id') && !response.body[0].hasOwnProperty('_id') )
  })
})


describe('posting a new blog', () => {
  test('increases count of blogs by 1', async () => {
    const newPost = {
        title: "Test blog",
        author: "jesse",
        url: "bingus-verkkosivut",
        likes: 4
    }

    const initialBlogs = await helper.getAllBlogs()

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newPost)
    
    const currentBlogs = await helper.getAllBlogs()
    
    assert.strictEqual(initialBlogs.length + 1, currentBlogs.length)
  })

  test('without a token responds with status 401', async () => {
    const newPost = {
        title: "Test blog",
        author: "jesse",
        url: "bingus-verkkosivut",
        likes: 4
    }

    await api
      .post('/api/blogs')
      .send(newPost)
      .expect(401)
  })

  test('without likes has it\'s likes set to 0', async () => {
    const newPost = {
        title: "Test blog without likes",
        author: "jesse",
        url: "bingus-verkkosivut"
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newPost)

    assert(response.body.hasOwnProperty('likes') && response.body.likes === 0)
  })

  test('without a title causes response status 400', async () => {
    const newPost = {
        author: "jesse",
        url: "bingus-verkkosivut",
        likes: 2
    }

    await api.post('/api/blogs')
      .send(newPost)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)
  })

  test('without a url causes response status 400', async () => {
    const newBlog = {
        title: "Test blog without url",
        author: "jesse",
        likes: 2
    }

    await api.post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)
  })
})

describe('when updating a blog', () => {
  test('successfully updating responds with status 200', async () => {
    const blogs = await helper.getAllBlogs()
    const id = blogs[0].id
    
    const updatedBlog = {
      ...blogs[0],
      url: "new-url-here"
    }
    
    await api.put(`/api/blogs/${id}`)
      .send(updatedBlog)
      .expect(200)
  })

  test('with invalid id responds with status 400', async () => {
    const blogs = await helper.getAllBlogs()
    const id = "stupid id"
    
    await api.put(`/api/blogs/${id}`)
      .send(blogs[0])
      .expect(400)
  })
})

describe('when deleting a blog', () => {
  test('successful deletion responds with status 204', async () => {
    const blogs = await helper.getAllBlogs()
    const id = blogs[0].id
    
    await api.delete(`/api/blogs/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)
  })

  test('without token responds with status 401', async () => {
    const blogs = await helper.getAllBlogs()
    const id = blogs[0].id
    
    await api.delete(`/api/blogs/${id}`)
      .expect(401)
  })
})

after(async () => {
  await mongoose.connection.close()
})