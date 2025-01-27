import { useMutation } from '@tanstack/react-query'
import { createNewAnecdote } from '../requests'
import { useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createNewAnecdote,
    onSuccess: newAnecdote => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    },
    onError: error => {
      const errorMessage = error.response.data.error
      dispatch({ type: 'SET_NOTIFICATION', payload: errorMessage})
      setTimeout(() => {
        dispatch({ type: 'SET_NOTIFICATION', payload: ''})
      }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
    dispatch({ type: 'SET_NOTIFICATION', payload: `created "${content}"`})
    setTimeout(() => {
      dispatch({ type: 'SET_NOTIFICATION', payload: ''})
    }, 5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
