import {createSlice} from '@reduxjs/toolkit'
import authThunk from '../actions/authAction'

const initialState = {
  current_user: localStorage.getItem('current_user')
    ? JSON.parse(localStorage.getItem('current_user'))
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateCurrentUser: (state) => {
      state.current_user =  JSON.parse(localStorage.getItem('current_user'))
    },
    googleAuth: (state, action) => {
      state.current_user = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(authThunk.login.pending, (state) => {})
      .addCase(authThunk.login.fulfilled, (state, action) => {
        state.current_user = action.payload;
      })
      .addCase(authThunk.login.rejected, (state, action) => {})
      .addCase(authThunk.logout.pending, (state) => {})
      .addCase(authThunk.logout.rejected, (state) => {})
      .addCase(authThunk.logout.fulfilled, (state) => {
        state.current_user = null;
      })
  }
})

export const authActions = authSlice.actions 
export default authSlice.reducer