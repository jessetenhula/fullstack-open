import { createContext, useReducer, useContext } from 'react'

const loginReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER': {
      return action.payload
    }
    case 'LOGOUT': {
      return null
    }
    default: {
      return state
    }
  }
}

const LoginContext = createContext()

export const LoginContextProvider = (props) => {
  const [loggedInUser, loginDispatch] = useReducer(loginReducer, null)

  return (
    <LoginContext.Provider value={[loggedInUser, loginDispatch]}>
      {props.children}
    </LoginContext.Provider>
  )
}

export const useLoginValue = () => {
  const userAndDispatch = useContext(LoginContext)
  return userAndDispatch[0]
}

export const useLoginDispatch = () => {
  const userAndDispatch = useContext(LoginContext)
  return userAndDispatch[1]
}

export default LoginContext
