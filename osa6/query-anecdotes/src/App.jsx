import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAllAnecdotes, updateAnecdote } from './requests'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: updatedAnecdote =>  {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(a => a.id === updatedAnecdote.id ? updatedAnecdote : a))
    },
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch({ type: 'SET_NOTIFICATION', payload: `voted "${anecdote.content}"`})
    setTimeout(() => {
      dispatch({ type: 'SET_NOTIFICATION', payload: ''})
    }, 5000)
  }

  const anecdoteQuery = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAllAnecdotes,
    retry: false
  })

  const anecdotes = anecdoteQuery.data ?? []

  return (
    <div>
      {anecdoteQuery.isError ? 'anecdote service not available due to problems with the server' :
      <>
        <h3>Anecdote app</h3>
        {anecdoteQuery.isLoading ? <p>loading...</p> :
        <>
          <Notification />
          <AnecdoteForm />
        
          {anecdotes.toSorted((a, b) => b.votes - a.votes).map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => handleVote(anecdote)}>vote</button>
              </div>
            </div>
          )}
        </>}
      </>}
    </div>
  )
}

export default App
