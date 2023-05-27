import {createSlice} from '@reduxjs/toolkit'
import authThunk from '../actions/authAction'

const initialState = {
  user: {},
  tokens: {},
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder.addCase(authThunk.login.fulfilled, (state, action) => {
      state.user = action.payload.user
      state.tokens = action.payload.tokens
    })
  }
})

export default authSlice.reducer