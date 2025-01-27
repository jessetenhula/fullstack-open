import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

export const getAllAnecdotes = () => {
  return axios.get(url).then(res => res.data)
}

export const createNewAnecdote = content => {
  return axios.post(url, content).then(res => res.data)
}

export const updateAnecdote = anecdote => {
  return axios.put(`${url}/${anecdote.id}`, anecdote).then(res => res.data)
}