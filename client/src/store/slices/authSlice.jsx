import {createSlice} from '@reduxjs/toolkit'
import authThunk from '../actions/authAction'

const initialState = {
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    googleAuth: (state, action) => {
      state.user = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(authThunk.login.pending, (state) => {})
      .addCase(authThunk.login.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(authThunk.login.rejected, (state, action) => {})
      .addCase(authThunk.logout.pending, (state) => {})
      .addCase(authThunk.logout.rejected, (state) => {})
      .addCase(authThunk.logout.fulfilled, (state) => {
        state.user = null
      })
  }
})

export const authActions = authSlice.actions 
export default authSlice.reducer