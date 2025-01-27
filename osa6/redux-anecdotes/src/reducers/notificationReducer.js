import { createSlice } from "@reduxjs/toolkit";

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotificationMessage(state, action) {
      return state = action.payload
    },
  }
})

export const { setNotificationMessage } = notificationSlice.actions

export const setNotification = (message, seconds) => {
  return async dispatch => {
    dispatch(setNotificationMessage(message))
    await new Promise(resolve => {
      setTimeout(() => {
        resolve(dispatch(setNotificationMessage('')))
      }, seconds * 1000)
    })
  }
}

export default notificationSlice.reducer