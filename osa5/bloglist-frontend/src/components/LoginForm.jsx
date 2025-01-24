import { useState } from 'react'

const LoginForm = ({ submitLogin }) => {
  const [loginFormInput, setLoginFormInput] = useState({ username: '', password: '' })

  const handleChange = event => {
    setLoginFormInput({
      ...loginFormInput,
      [event.target.name]: event.target.value
    })
  }

  const attemptLogin = event => {
    event.preventDefault()
    submitLogin(loginFormInput)
    setLoginFormInput({ username: '', password: '' })
  }

  return (
    <div>
      <form onSubmit={attemptLogin}>
        <label>
          username<input type="text" name="username" onChange={handleChange} value={loginFormInput.username} data-testid="username"></input>
        </label>
        <label>
          password<input type="password" name="password" onChange={handleChange} value={loginFormInput.password} data-testid="password"></input>
        </label>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm