import {createSlice} from '@reduxjs/toolkit'
import authThunk from '../actions/authAction'

const initialState = {
  user: {},
  tokens: {},
  error: false,
  message: '',
  loading: false
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
    }).addCase(authThunk.login.rejected, (state, action) => {
      // console.log(action.payload.message)
      state.error = true
    })
  }
})

export default authSlice.reducer