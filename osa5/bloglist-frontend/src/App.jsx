import { useState, useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    if(window.localStorage.getItem('loggedInUser')) {
      const loggedInUserParsed = JSON.parse(window.localStorage.getItem('loggedInUser'))
      setUser(loggedInUserParsed)
      blogService.setToken(loggedInUserParsed.token)
    }

    blogService.getAll().then(blogs =>
      setBlogs(blogs.toSorted((a, b) => b.likes - a.likes))
    )
  }, [])

  const displayNotification = message => {
    setNotification(message)
    setTimeout(() => setNotification(''), 5000)
  }

  const login = credentials => {
    loginService
      .login(credentials)
      .then(response => {
        const user = { token: response.token, username: response.username, name: response.name }
        setUser(user)
        window.localStorage.setItem('loggedInUser', JSON.stringify(user))
        blogService.setToken(response.token)
        displayNotification(`logged into account "${response.username}"`)
      })
      .catch(error => {
        displayNotification(error.response.data.error)
      })
  }

  const logout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedInUser')
  }

  const addBlog = newBlog => {
    blogFormRef.current.toggleVisibility()

    blogService
      .createBlog({ ...newBlog })
      .then(blog => {
        setBlogs(blogs.concat(blog).toSorted((a, b) => b.likes - a.likes))
        displayNotification(`added a new blog ${blog.title} by author ${blog.author}`)
      })
      .catch(error => {
        displayNotification(error.response.data.error)
      })
  }

  const likeBlog = blog => {
    blogService
      .updateBlog({ ...blog, likes: blog.likes + 1, user: blog.user.id })
      .then(updatedBlog => {
        setBlogs((blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog )).toSorted((a, b) => b.likes - a.likes))
      })
      .catch(error => {
        displayNotification(error.response.data.error)
      })
  }

  const removeBlog = removedBlog => {
    if(window.confirm(`delete blog "${removedBlog.title}" by author ${removedBlog.author}?`)) {
      blogService
        .deleteBlog(removedBlog)
        .then(response => {
          setBlogs((blogs.filter(blog => blog.id !== removedBlog.id)).toSorted((a, b) => b.likes - a.likes))
          displayNotification(`deleted blog "${removedBlog.title}" by author ${removedBlog.author}`)
        })
        .catch(error => {
          displayNotification(error.response.data.error)
        })
    }
  }

  return (
    <>
      <h1>Blogs</h1>
      {!user &&
      <div>
        <h2>Log in</h2>
        <Notification message={notification} />
        <LoginForm submitLogin={login}/>
      </div>}
      {user &&
      <div>
        <Notification message={notification} />
        <p>
          {user.name} logged in<button onClick={logout}>logout</button>
        </p>
        <Togglable buttonLabel=": add new blog" ref={blogFormRef}>
          <BlogForm createBlog={addBlog}/>
        </Togglable>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} user={user} handleLikeClick={() => likeBlog(blog)} handleRemoveClick={() => removeBlog(blog)} />
        )}
      </div>}
    </>
  )
}

export default App