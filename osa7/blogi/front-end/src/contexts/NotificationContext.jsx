import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION': {
      return action.payload
    }
    default: {
      return state
    }
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ''
  )

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}
export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export const useDisplayNotification = () => {
  const dispatchNotification = useNotificationDispatch()

  return (message, seconds = 5) => {
    dispatchNotification({ type: 'SET_NOTIFICATION', payload: message })
    setTimeout(
      () => dispatchNotification({ type: 'SET_NOTIFICATION', payload: '' }),
      seconds * 1000
    )
  }
}

export default NotificationContext
