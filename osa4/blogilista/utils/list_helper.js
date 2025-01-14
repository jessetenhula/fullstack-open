const dummy = blogs => 1

const totalLikes = blogs => blogs.reduce((sum, item) => sum + item.likes, 0)

const favoriteBlog = blogs => {
  const maxLikes = Math.max(...blogs.map(blog => blog.likes))
  return blogs.find(blog => blog.likes === maxLikes)
}

const mostBlogs = blogs => {
  const blogAmounts = Object.entries(blogs
    .reduce((result, item) => {
      result[item.author] = result[item.author] + 1 || 1
      return result
      }, {}))
        .map(item => {
          return { author: item[0], blogs: item[1] }
        })

  const maxBlogs = Math.max(...blogAmounts.map(item => item.blogs))
  return blogAmounts.find(blog => blog.blogs === maxBlogs)
}

const mostLikes = blogs => {
  const likeAmounts = Object.entries(blogs
    .reduce((result, item) => {
      result[item.author] = result[item.author] + item.likes || item.likes
      return result
      }, {}))
        .map(item => {
          return { author: item[0], likes: item[1] }
        })
        
  const maxLikes = Math.max(...likeAmounts.map(item => item.likes))
  return likeAmounts.find(blog => blog.likes === maxLikes)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}