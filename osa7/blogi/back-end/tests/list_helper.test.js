const { test, describe } = require('node:test')
const assert = require('node:assert')

const listHelper = require('../utils/list_helper')
const blog = require('../models/blog')

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

describe('dummy', () => {
  test('dummy returns one', () => {
    assert.strictEqual(listHelper.dummy([]), 1)
  })
})

describe('totalLikes', () => {
  test('totalLikes returns 0 on empty list', () => {
    assert.strictEqual(listHelper.totalLikes([]), 0)
  })

  test('totalLikes returns the number of likes of the sole blog in an array', () => {
    assert.strictEqual(listHelper.totalLikes([blogs[0]]), 7)
  })

  test('totalLikes returns correct amount of likes of an array of multiple blogs', () => {
    assert.strictEqual(listHelper.totalLikes(blogs), 36)
  })
})

describe('favoriteBlog', () => {
  test('favoriteBlog returns undefined on empty list', () => {
    assert.strictEqual(listHelper.favoriteBlog([]), undefined)
  })

  test('favoriteBlog returns the blog that is the sole blog in an array', () => {
    assert.strictEqual(listHelper.favoriteBlog([blogs[0]]), blogs[0])
  })

  test('favoriteBlog returns the blog with the most likes from an array of multiple blogs', () => {
    assert.strictEqual(listHelper.favoriteBlog(blogs), blogs[2])
  })
})

describe('mostBlogs', () => {
  test('mostBlogs returns undefined on empty list', () => {
    assert.strictEqual(listHelper.mostBlogs([]), undefined)
  })

  test('favoriteBlog returns the name of the blogger and 1 from an array with one blog', () => {
    assert.deepStrictEqual(listHelper.mostBlogs([blogs[0]]), { author: "Michael Chan", blogs: 1 })
  })

  test('mostBlogs returns the name of the blogger and their number of blogs from an array of multiple blogs', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(blogs),  { author: "Robert C. Martin", blogs: 3})
  })
})

describe('mostLikes', () => {
  test('mostLikes returns undefined on empty list', () => {
    assert.strictEqual(listHelper.mostLikes([]), undefined)
  })

  test('mostLikes returns the name of the blogger and the blogs likes from an array with one blog', () => {
    assert.deepStrictEqual(listHelper.mostLikes([blogs[0]]), { author: "Michael Chan", likes: 7 })
  })

  test('mostLikes returns the name of the blogger and their total likes from an array of multiple blogs', () => {
    assert.deepStrictEqual(listHelper.mostLikes(blogs),  { author: "Edsger W. Dijkstra", likes: 17})
  })
})