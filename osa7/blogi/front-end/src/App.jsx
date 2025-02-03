import { useEffect, useContext } from 'react'
import { useDisplayNotification } from './contexts/NotificationContext.jsx'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginContext from './contexts/LoginContext.jsx'
import { Routes, Route, Link, useMatch, useNavigate } from 'react-router-dom'
import { useGetBlogs } from './hooks/blogs.js'
import { useGetUsers } from './hooks/users'

const App = () => {
  const [loggedInUser, loginDispatch] = useContext(LoginContext)
  const displayNotification = useDisplayNotification()
  const navigate = useNavigate()
  const blogs = useGetBlogs().data ?? []
  const matchBlogs = useMatch('/blogs/:id')
  const blog = matchBlogs
    ? blogs.find((blog) => blog.id === matchBlogs.params.id)
    : null
  const users = useGetUsers().data ?? []
  const matchUser = useMatch('/users/:id')
  const user = matchUser
    ? users.find((user) => user.id === matchUser.params.id)
    : null

  useEffect(() => {
    if (window.localStorage.getItem('loggedInUser')) {
      const loggedInUserParsed = JSON.parse(
        window.localStorage.getItem('loggedInUser')
      )
      loginDispatch({ type: 'SET_USER', payload: loggedInUserParsed })
      blogService.setToken(loggedInUserParsed.token)
    }
  }, [])

  const login = (credentials) => {
    loginService
      .login(credentials)
      .then((response) => {
        const user = {
          token: response.token,
          username: response.username,
          name: response.name,
        }
        loginDispatch({ type: 'SET_USER', payload: user })
        window.localStorage.setItem('loggedInUser', JSON.stringify(user))
        blogService.setToken(response.token)
        displayNotification(`logged into account "${response.username}"`)
      })
      .catch((error) => {
        displayNotification(error.response.data.error)
      })
  }

  const logout = () => {
    loginDispatch({ type: 'LOGOUT' })
    window.localStorage.removeItem('loggedInUser')
    navigate('/')
  }

  return (
    <>
      {!loggedInUser && (
        <div className="page-container">
          <h1>Blogs</h1>
          <h2>Log in</h2>
          <Notification />
          <LoginForm submitLogin={login} />
        </div>
      )}
      {loggedInUser && (
        <div className="page-container">
          <header>
            <nav>
              <Link to="/blogs">blogs</Link>
              <Link to="/users">users</Link>
            </nav>
            <span>{loggedInUser.name}</span>
            <span>logged in</span>
            <button onClick={logout}>logout</button>
          </header>
          <Notification />
          <Routes>
            <Route path="/" element={<p>hi :)</p>} />
            <Route path="/blogs" element={<Blogs blogs={blogs} />} />
            <Route
              path="/blogs/:id"
              element={<Blog blog={blog} user={loggedInUser} />}
            />
            <Route path="/users" element={<Users users={users} />} />
            <Route path="/users/:id" element={<User user={user} />} />
          </Routes>
        </div>
      )}
    </>
  )
}

export default App
