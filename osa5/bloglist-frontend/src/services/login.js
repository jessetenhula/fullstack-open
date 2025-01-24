import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/login'

const login = async userInfo => {
  const response = await axios.post(baseUrl, userInfo)
  return response.data
}

export default { login }