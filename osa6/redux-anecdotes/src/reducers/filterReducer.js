import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterChanged(state, action) {
      return state = action.payload
    }
  }
})

export const { filterChanged } = filterSlice.actions
export default filterSlice.reducer
