import axios from "axios";

const url = 'http://localhost:3001/anecdotes'

const getAll = () => {
  const request = axios.get(url)
  return request.then(response => response.data)
}

const createNew = content => {
  const request = axios.post(url, { content, votes: 0 })
  return request.then(response => response.data)
}

const update = anecdote => {
  const request = axios.put(`${url}/${anecdote.id}`, anecdote)
  return request.then(response => response.data)
}

export default {
  getAll,
  createNew,
  update
}