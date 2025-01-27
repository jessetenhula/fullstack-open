import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = e => {
    e.preventDefault()
    const content = e.target.anecdotefield.value
    e.target.anecdotefield.value = ''

    dispatch(createAnecdote(content))
    dispatch(setNotification(`created "${content}"`, 5))
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdotefield"/></div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default AnecdoteForm