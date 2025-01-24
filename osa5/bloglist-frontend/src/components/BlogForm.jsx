import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [blogFormInput, setBlogFormInput] = useState({ title: '', author: '', url: '' })

  const handleChange = event => {
    setBlogFormInput({
      ...blogFormInput,
      [event.target.name]: event.target.value
    })
  }

  const addBlog = event => {
    event.preventDefault()
    createBlog(blogFormInput)
    setBlogFormInput({ title: '', author: '', url: '' })
  }

  return (
    <div>
      <h2>create new blog</h2>
      <form onSubmit={addBlog}>
        <label>
          title:<input type="text" name="title" onChange={handleChange} value={blogFormInput.title} data-testid="title"></input>
        </label>
        <label>
          author:<input type="text" name="author" onChange={handleChange} value={blogFormInput.author} data-testid="author"></input>
        </label>
        <label>
          url:<input type="text" name="url" onChange={handleChange} value={blogFormInput.url} data-testid="url"></input>
        </label>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm