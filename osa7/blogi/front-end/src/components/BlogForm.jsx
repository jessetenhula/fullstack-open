import { useState } from 'react'
import { useDisplayNotification } from '../NotificationContext'
import { useCreateBlog } from '../hooks/blogs.js'

const BlogForm = ({ toggleVisibility }) => {
  const displayNotification = useDisplayNotification()
  const newBlogMutation = useCreateBlog()
  const [blogFormInput, setBlogFormInput] = useState({
    title: '',
    author: '',
    url: '',
  })

  const addBlog = (event) => {
    event.preventDefault()
    setBlogFormInput({ title: '', author: '', url: '' })
    toggleVisibility()

    newBlogMutation.mutate(
      { ...blogFormInput },
      {
        onSuccess: (newBlog) => {
          displayNotification(
            `created new blog "${newBlog.title}" by author ${newBlog.author}`
          )
        },
        onError: (error) => {
          displayNotification(error.response.data.error)
        },
      }
    )
  }

  const handleChange = (event) => {
    setBlogFormInput({
      ...blogFormInput,
      [event.target.name]: event.target.value,
    })
  }

  return (
    <form onSubmit={addBlog} className="blog-form">
      <div>
        <label htmlFor="blog-form-title">title:</label>
        <input
          type="text"
          name="title"
          id="blog-form-title"
          onChange={handleChange}
          value={blogFormInput.title}
          data-testid="title"
        ></input>
      </div>
      <div>
        <label htmlFor="blog-form-author">author:</label>
        <input
          type="text"
          name="author"
          id="blog-form-author"
          onChange={handleChange}
          value={blogFormInput.author}
          data-testid="author"
        ></input>
      </div>
      <div>
        <label htmlFor="blog-form-url">url:</label>
        <input
          type="text"
          name="url"
          id="blog-form-url"
          onChange={handleChange}
          value={blogFormInput.url}
          data-testid="url"
        ></input>
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm
