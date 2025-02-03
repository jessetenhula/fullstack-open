import { Link } from 'react-router-dom'

const User = ({ user }) => {
  if (!user) {
    return null
  }

  return (
    <>
      <h1>{user.name}</h1>
      <h2>added blogs</h2>
      <ul className="blog-list">
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`} className="blog-list-item">
              <span>{blog.title} </span>
              <span>{blog.author}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default User
