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
  },
  extraReducers: builder => {
    builder
      .addCase(authThunk.login.pending, (state) => {
      })
      .addCase(authThunk.login.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(authThunk.login.rejected, (state, action) => {
        
      });
  }
})

export const resetErrorState = authSlice.actions 
export default authSlice.reducer