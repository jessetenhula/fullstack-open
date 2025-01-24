import { useState } from 'react'

const Blog = ({ blog, user, handleLikeClick, handleRemoveClick }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="blog-item">
      <div className="blog-title-bar">
        <span>{blog.title}</span>
        <span>{blog.author}</span>
        <button onClick={() => setExpanded(!expanded)}>{expanded ? 'hide' : 'show'}</button>
      </div>
      {expanded &&
      <>
        <ul className="blog-item-details">
          <li>{blog.url}</li>
          <li>likes {blog.likes}<button onClick={handleLikeClick} className="blog-like-button">like</button></li>
          <li>{blog.user.name}</li>
        </ul>
        {(user.username === blog.user.username) &&
        <button onClick={handleRemoveClick}>remove</button>
        }
      </>
      }
    </div>
  )
}

export default Blog