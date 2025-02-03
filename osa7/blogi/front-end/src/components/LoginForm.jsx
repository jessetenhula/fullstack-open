import { useState } from 'react'

const LoginForm = ({ submitLogin }) => {
  const [loginFormInput, setLoginFormInput] = useState({
    username: '',
    password: '',
  })

  const handleChange = (event) => {
    setLoginFormInput({
      ...loginFormInput,
      [event.target.name]: event.target.value,
    })
  }

  const attemptLogin = (event) => {
    event.preventDefault()
    submitLogin(loginFormInput)
    setLoginFormInput({ username: '', password: '' })
  }

  return (
    <form onSubmit={attemptLogin} className="login-form">
      <div>
        <label htmlFor="login-form-username">username</label>
        <input
          type="text"
          name="username"
          id="login-form-username"
          onChange={handleChange}
          value={loginFormInput.username}
          data-testid="username"
        ></input>
      </div>
      <div>
        <label htmlFor="login-form-password">password </label>
        <input
          type="password"
          name="password"
          id="login-form-password"
          onChange={handleChange}
          value={loginFormInput.password}
          data-testid="password"
        ></input>
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm
