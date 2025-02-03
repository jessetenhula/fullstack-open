import { useCreateComment } from '../hooks/comments'
import { useDisplayNotification } from '../NotificationContext'

const CommentForm = ({ blogId }) => {
  const newCommentMutation = useCreateComment()
  const displayNotification = useDisplayNotification()

  const postComment = (event) => {
    event.preventDefault()

    const content = event.target.content.value
    newCommentMutation.mutate(
      { content, blogId },
      {
        onSuccess: () => {
          displayNotification(`added new comment "${content}"`)
        },
        onError: (error) => {
          displayNotification(error.response.data.error)
        },
      }
    )
  }

  return (
    <form onSubmit={postComment} className="comment-form">
      <label htmlFor="comment-form-content">comment:</label>
      <input type="text" name="content" id="comment-form-content"></input>
      <button type="submit">post</button>
    </form>
  )
}

export default CommentForm
