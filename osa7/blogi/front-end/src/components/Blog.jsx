import { useDisplayNotification } from '../NotificationContext'
import { useUpdateBlog, useDeleteBlog } from '../hooks/blogs.js'
import { useNavigate } from 'react-router-dom'
import CommentForm from './CommentForm'

const Blog = ({ blog, user }) => {
  const displayNotification = useDisplayNotification()
  const navigate = useNavigate()
  const updateBlogMutation = useUpdateBlog()
  const deleteBlogMutation = useDeleteBlog()

  const likeBlog = (event) => {
    updateBlogMutation.mutate(
      { ...blog, likes: blog.likes + 1, user: blog.user.id },
      {
        onSuccess: () => {
          displayNotification(
            `liked blog "${blog.title}" by author ${blog.author}`
          )
        },
        onError: (error) => {
          displayNotification(error.response.data.error)
        },
      }
    )
  }

  const removeBlog = (event) => {
    if (
      window.confirm(`delete blog "${blog.title}" by author ${blog.author}?`)
    ) {
      deleteBlogMutation.mutate(blog, {
        onSuccess: () => {
          displayNotification(
            `deleted blog "${blog.title}" by author ${blog.author}`
          )
          navigate(`/users/${blog.user.id}`)
        },
        onError: (error) => {
          displayNotification(error.response.data.error)
        },
      })
    }
  }

  if (!blog) {
    return null
  }

  return (
    <div className="blog">
      <h1 className="blog-title">
        <span>{blog.title}</span>
        <span>{blog.author}</span>
      </h1>
      <ul className="blog-details">
        <li>{blog.url}</li>
        <li>
          likes {blog.likes}
          <button onClick={likeBlog} className="blog-like-button">
            like
          </button>
        </li>
        <li>{blog.user.name}</li>
      </ul>
      {user.username === blog.user.username && (
        <button onClick={removeBlog}>remove</button>
      )}
      <CommentForm blogId={blog.id} />
      <ul className="blog-comments-list">
        {blog.comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  )
}

export default Blog
