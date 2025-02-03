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

const loginContext = createContext()

export const LoginContextProvider = (props) => {
  const [loggedInUser, loginDispatch] = useReducer(loginReducer, null)

  return (
    <loginContext.Provider value={[loggedInUser, loginDispatch]}>
      {props.children}
    </loginContext.Provider>
  )
}

export const useLoginValue = () => {
  const userAndDispatch = useContext(loginContext)
  return userAndDispatch[0]
}

export const useLoginDispatch = () => {
  const userAndDispatch = useContext(loginContext)
  return userAndDispatch[1]
}

export default loginContext
