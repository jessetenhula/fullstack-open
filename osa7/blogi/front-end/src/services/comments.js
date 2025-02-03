import axios from "axios"

const createComment = ({ content, blogId }) => {
  return axios.post(`/api/blogs/${blogId}/comments`, { content: content }).then(response => response.data)
}

export default { createComment }