import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { useRef } from 'react'

import { Link } from 'react-router-dom'

const Blogs = ({ blogs }) => {
  const blogFormRef = useRef()

  return (
    <>
      <h1>Blogs</h1>
      <Togglable buttonLabel=": add new blog" ref={blogFormRef}>
        <div className="blog-form-container">
          <h2>create new blog</h2>
          <BlogForm
            toggleVisibility={() => blogFormRef.current.toggleVisibility()}
          />
        </div>
      </Togglable>
      <ul className="blog-list">
        {blogs
          .toSorted((a, b) => b.likes - a.likes)
          .map((blog) => (
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

export default Blogs
